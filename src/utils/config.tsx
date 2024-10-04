interface API {
    readonly API_URL:string
}

const Config: API = {
	API_URL: process.env.REACT_APP_API_URL || ''
};

export default Config;
