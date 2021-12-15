import { v4 as uuidv4 } from 'uuid'

let myId = uuidv4();

let processText = function (text) {
    return "[Processed by " + myId + "] " + text;
}

/**
 * Valid textprocessor request is a HTTP-POST request with plaintext
 * @param {*} request 
 * @param {*} response 
 */
exports.textprocessor = function (request, response) {
    switch (request.method) {
        case 'POST':
            let content_type = request.get('content-type');
            if (content_type === 'text/plain') {
                let processedText = processText(request.body);
                response.status(200).send(processedText);
            }
            else {
                // invalid content type
                response.status(400).send();
            }
            break;
        default:
            response.status(405).send();
            break;
    }
}