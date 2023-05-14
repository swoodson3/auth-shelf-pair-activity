import { put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

function* postItem(action) {
try {
    yield axios.post('/api/shelf', action.payload);
    // Call the GET
    yield put({ type: '' });
    // We can pass functions through actions
    action.setNewElement('');
} catch (error) {
    console.log(`error in postElement`);
    alert('Something went wrong');
}
};