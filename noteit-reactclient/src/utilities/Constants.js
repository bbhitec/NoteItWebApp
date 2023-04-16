// [bp] holds paths constants for API routes
const API_BASE_URL_DEVELOPMENT = 'https://localhost:7264';
const API_BASE_URL_PRODUCTION = 'https://noteit-aspnetserver.azurewebsites.net';

const ENDPOINTS = {
    GET_ALL_NOTES:      'get-all-notes',
    GET_NOTE_BY_ID:     'get-note-by-id',
    CREATE_NOTE:        'create-note',
    UPDATE_NOTE:        'update-note',
    DELETE_NODE_BY_ID:  'delete-note_by-id'
}

const development = {
    API_URL_GET_ALL_NOTES:      `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ALL_NOTES}`,
    API_URL_GET_NOTE_BY_ID:     `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_NOTE_BY_ID}`,
    API_URL_CREATE_NOTE:        `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE_NOTE}`,
    API_URL_UPDATE_NOTE:        `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_NOTE}`,
    API_URL_DELETE_NOTE_BY_ID:  `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_NODE_BY_ID}`
};

const production = {
    API_URL_GET_ALL_NOTES:      `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_ALL_NOTES}`,
    API_URL_GET_NOTE_BY_ID:     `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_NOTE_BY_ID}`,
    API_URL_CREATE_NOTE:        `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.CREATE_NOTE}`,
    API_URL_UPDATE_NOTE:        `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.UPDATE_NOTE}`,
    API_URL_DELETE_NOTE_BY_ID:  `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.DELETE_NODE_BY_ID}`
};

const Constants = process.env.NODE_ENV === 'development' ? development : production;

export default Constants;