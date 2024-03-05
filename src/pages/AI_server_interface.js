const url_address = "http://127.0.0.1:5000/";
const fill_endpoint = "get_fill_in_prob"
const text_endpoint = "get_text_prob"

async function pingURL(url) {
    return fetch(url, { method: 'HEAD' })
    .then(response => {
        return true;
    })
    .catch(error => {
        return false;
    });
}
const server_is_up = await pingURL(url_address)
const fill_prob = async (before, fill, after, ratio) => {
    const params = {
        before: before,
        fill: fill,
        after: after,
        ratio: ratio
    };

    const url = new URL(url_address + fill_endpoint);
    url.search = new URLSearchParams(params).toString();
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
}

const text_prob = async (text) => {
    const params = {
        text: text
    };

    const url = new URL(url_address + text_endpoint);
    url.search = new URLSearchParams(params).toString();
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
}

export { server_is_up, pingURL, fill_prob, text_prob };
