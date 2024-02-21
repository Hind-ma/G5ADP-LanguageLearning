from transformers import AutoTokenizer, AutoModelForCausalLM
import torch


class swegpt_handeler:
    def __init__(self) -> None:
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.tokenizer = AutoTokenizer.from_pretrained("AI-Sweden-Models/gpt-sw3-356m")
        self.model = AutoModelForCausalLM.from_pretrained("AI-Sweden-Models/gpt-sw3-356m").to(self.device)


    def calc_fill_prob(self, start_text, fill_in_text, end_text, goal_ratio = 1):
        fill_in__ids = self.tokenizer(fill_in_text, return_tensors="pt")["input_ids"][0].to(dtype = torch.int64).to(self.device)
        start_ids = self.tokenizer('<s> ' + start_text, return_tensors="pt")["input_ids"][0].to(dtype = torch.int64).to(self.device)
        end_ids = self.tokenizer(end_text, return_tensors="pt")["input_ids"][0].to(dtype = torch.int64).to(self.device)
        all_ids = torch.cat((start_ids, fill_in__ids, end_ids))[:-1]
        with torch.no_grad():
            logits = self.model(all_ids.unsqueeze(0), use_cache=True).logits
        logits = logits[0,-(fill_in__ids.shape[0] + end_ids.shape[0]):]
        probs = torch.softmax(logits, dim = 1)
        prob = probs[torch.arange(fill_in__ids.shape[0] + end_ids.shape[0]), torch.cat((fill_in__ids, end_ids))]
        ratio = goal_ratio / (fill_in__ids.shape[0] / end_ids.shape[0]) if fill_in__ids.shape[0] != 0 and end_ids.shape[0] != 0 else 1 
        weights = torch.cat((torch.full(fill_in__ids.shape, ratio).to(self.device),(torch.ones_like(end_ids).to(self.device))))
        weighed_probs = torch.pow(prob, weights)
        exponent = 1 / torch.sum(weights)
        suum = torch.sum(torch.log(weighed_probs))
        final_log_prob = (suum * exponent)
        final_prob = torch.exp(final_log_prob)
        return final_prob.item() if final_prob != str(final_prob.item()) != "nan" else 0