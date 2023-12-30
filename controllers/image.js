const Clarifai = require('clarifai');

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '52dc2b6c894a4ae7815e25090310311d';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'shayshame';       
    const APP_ID = 'facetrain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';   
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    return requestOptions


}

const handleApiCall = (input, req, res) => {
	fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(input))
	.then(response => response.json())
	.then(data => {
		console.log(data);
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to access API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}