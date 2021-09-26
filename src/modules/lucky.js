import axios from 'axios'
import Ultilities from '../Ultilities/global'
// import crypto from './crypto'
import {SERVER_ERROR} from './server'
export const LUCKY_REQUEST = 'lucky/LUCKY_REQUEST'
export const LUCKY_RESPONSE = 'lucky/LUCKY_RESPONSE'
export const LUCKY_ROTATION_DETAIL_RESPONSE = 'lucky/LUCKY_ROTATION_DETAIL_RESPONSE'
export const LUCKY_ROTATION_DETAIL_RESPONSE_USER = 'lucky/LUCKY_ROTATION_DETAIL_RESPONSE_USER'
export const LUCKY_DETAIL_RESPONSE = 'lucky/LUCKY_DETAIL_RESPONSE'
export const LUCKY_RESPONSE_MORE = 'lucky/LUCKY_RESPONSE_MORE'
export const LUCKY_PICK_RESPONSE = 'lucky/LUCKY_PICK_RESPONSE'
export const LUCKY_TURN_RESPONSE = 'lucky/LUCKY_TURN_RESPONSE'
export const LUCKY_HISTORY_RESPONSE='lucky/LUCKY_HISTORY_RESPONSE'
export const LUCKY_TU_DO='lucky/LUCKY_TU_DO';
export const LUCKY_HISTORY_TU_DO='lucky/LUCKY_HISTORY_TU_DO';
export const LUCKY_VINH_DANH='lucky/LUCKY_VINH_DANH';
export const LUCKY_CODE_BONUS='lucky/LUCKY_CODE_BONUS';
export const LUCKY_INFO='lucky/LUCKY_INFO'
export const LUCKY_ITEMS='lucky/LUCKY_ITEMS'
export const INFO_USER_RESPONSE='lucky/INFO_USER_RESPONSE'
export const DATA_USER_SPIN='lucky/DATA_USER_SPIN';
export const ITEM_AWARD='lucky/ITEM_AWARD';
export const LUCKY_SESSIONS='lucky/LUCKY_SESSIONS';
export const LUCKY_ROLLUP='lucky/LUCKY_ROLLUP';
export const DONATE='lucky/DONATE';
export const INFO_DONATE='lucky/INFO_DONATE';
export const CHECK_ROLLUP='lucky/CHECK_ROLLUP';
export const LIST_SANQUA='lucky/LIST_SANQUA';
export const SET_PHIEN_SANQUA='lucky/SET_PHIEN_SANQUA';
export const LUCKY_INFO_SANQUA='lucky/LUCKY_INFO_SANQUA';


const initialState = {
	data: [], 
	waiting: false
}

var keySize = 256;
var ivSize = 128;
var saltSize = 256;
var iterations = 1000;


export default (state = initialState, action) => { 
	switch (action.type) {
		case LUCKY_REQUEST:
			return {
				...state,
				waiting: true
			}
		case LUCKY_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case LUCKY_RESPONSE_MORE:
			return {
				...state,
				data: state.data.concat(action.data),
				totalRecords: action.totalRecords,
				waiting: false
			}
		case LUCKY_DETAIL_RESPONSE:
			return {
				...state,
				dataDetail: action.data,
				waiting: false
			}
		case LUCKY_PICK_RESPONSE:
			return {
				...state,
				dataPick: action.data,
				waiting: false
			}
		case LUCKY_TURN_RESPONSE:
			return {
				...state,
				dataTurn: action.data,
				waiting: false
			}
		case LUCKY_HISTORY_RESPONSE:
			return {
				...state,
				dataHistory: action.data,
				waiting: false
			}
		case LUCKY_ROTATION_DETAIL_RESPONSE:
			return {
				...state,
				dataRotation: action.data,
				waiting: false
			}
		case LUCKY_ROTATION_DETAIL_RESPONSE_USER:
			return {
				...state,
				dataRotationWithUser: action.data,
				waiting: false
			}
		case LUCKY_TU_DO:
			return {
				...state,
				dataTuDo: action.data,
				waiting: false
			}
		case LUCKY_HISTORY_TU_DO:
			return {
				...state,
				dataHistoryTuDo: action.data,
				waiting: false
			}
		case LUCKY_VINH_DANH:
			return {
				...state,
				dataVinhDanh: action.data,
				waiting: false
			}
		case LUCKY_CODE_BONUS:
			return {
				...state,
				dataCodeBonus: action.data,
				waiting: false
			}
		case LUCKY_INFO:
			return {
				...state,
				dataLuckyInfo: action.data,
				waiting: false
			}
		case LUCKY_ITEMS:
			return {
				...state,
				dataLuckyItems: action.data,
				waiting: false
			}
		case INFO_USER_RESPONSE:
			return {
				...state,
				dataInfoUser: action.data,
				waiting: false
			}
		case DATA_USER_SPIN:
			return {
				...state,
				dataUserSpin: action.data,
				waiting: false
			}
		case ITEM_AWARD:
			return {
				...state,
				dataItemAward: action.data,
				waiting: false
			}
		case LUCKY_SESSIONS:
			return {
				...state,
				dataSesions: action.data,
				waiting: false
			}
		case LUCKY_ROLLUP:
			return {
				...state,
				dataRollup: action.data,
				waiting: false
			}
		case INFO_DONATE:
			return {
				...state,
				dataInfoDonate: action.data,
				waiting: false
			}
		case DONATE:
			return {
				...state,
				dataDonate: action.data,
				waiting: false
			}
		case CHECK_ROLLUP:
			return {
				...state,
				dataCheckRollup: action.data,
				waiting: false
			}
		case LIST_SANQUA:
			return {
				...state,
				dataSanqua: action.data,
				waiting: false
			}
		case SET_PHIEN_SANQUA:
			return {
				...state,
				phienSanqua: action.data,
				waiting: false
			}
		case LUCKY_INFO_SANQUA:
			return {
				...state,
				dataLuckySanqua: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const getLuckyInfoSanQua = (type, sessionId, token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}
	

	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + `darts/user-join-session/?type=${type}&sessionId=${sessionId}`
		return axios.get(url, header).then(function (response) {
			console.log(response)
			dispatch({
				type: LUCKY_INFO_SANQUA,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}


export const setPhienSanQua = (obj) => {
	console.log(obj)
	return dispatch => {
		dispatch({
			type: SET_PHIEN_SANQUA,
			data: obj
		})
	}


}

export const getListSanQua = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}

	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url =Ultilities.base_url() + "darts/user-get-current-gift-hunter-sessions/"
		return axios.get(url, header).then(function (response) {
			console.log(response)
			dispatch({
				type: LIST_SANQUA,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const checkRollup = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}

	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/user-check-rollup"
		return axios.get(url, header).then(function (response) {
			console.log(response)
			dispatch({
				type: CHECK_ROLLUP,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getRollup = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}

	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/user-rollup"
		return axios.get(url, header).then(function (response) {
			console.log(response)
			dispatch({
				type: LUCKY_ROLLUP,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getInfoDonate = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}

	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/user-request-darts-giving/"
		return axios.get(url, header).then(function (response) {
			console.log(response)
			dispatch({
				type: INFO_DONATE,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}


export const getDonate = (token, receiver, darts, confirmCode) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
			"receiver":receiver,
			"darts":darts,
			"confirmCode":confirmCode
		}
	}

	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/user-give-darts/"
		return axios.get(url, header).then(function (response) {
			console.log(response)
			dispatch({
				type: DONATE,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}


export const getLuckyInfo = (type, token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}

	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/user-get-current-session/?type="+type
		return axios.get(url, header).then(function (response) {
			console.log(response)
			dispatch({
				type: LUCKY_INFO,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getMoreSessions= () => {

	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/current-sessions"
		return axios.get(url).then(function (response) {
			console.log(response)
			dispatch({
				type: LUCKY_SESSIONS,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}


export const gds = (type,sessionId,  token, code_key, type_device, x, y, i, delta) => {

	var code=encrypt(`t=${type}&s=${sessionId}&x=${x}&y=${y}&c=${type_device}&i=${i}&d=${delta}`, code_key)


	var myHeaders = new Headers();
	myHeaders.append("token", token);

	var formdata = new FormData();
	formdata.append("code", code);

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formdata,
		redirect: 'follow'
	  };
	

	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + `darts/user-throw/`;
		return fetch(url, requestOptions)
		.then(response => response.json())
		.then(result => {
			dispatch({
				type: DATA_USER_SPIN,
				data: result
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}



export const gdssssss = (type, points,sessionId,  token, code_key) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}
	
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + `darts/user-throw/?type=${type}&points=${points}&sessionId=${sessionId}`;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: DATA_USER_SPIN,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}


export const getVinhDanh = (limit, offset, type) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			// "token": token,
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/award-table/?type="+type+"&limit=" + limit + "&offset=" + offset;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: LUCKY_VINH_DANH,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getTuDo = (token, limit, offset) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/user-awards?offset=" + offset + "&limit=" + limit;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: LUCKY_TU_DO,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}


export const getHistoryTuDo = (token, limit, offset) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/user-history/?offset=" + offset + "&limit=" + limit;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: LUCKY_HISTORY_TU_DO,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}


export const getLuckyItems = () => {
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/awards"
		return axios.get(url).then(function (response) {
			console.log(response)
			dispatch({
				type: LUCKY_ITEMS,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}


export const getInfoUser = (token) => {
	
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/user-signin";
		return axios.get(url, header).then(function (response) {
			console.log("response.data:",response.data)
			dispatch({
				type: INFO_USER_RESPONSE,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}





export const userLogout = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}
	var url = Ultilities.base_url() + "darts/user-signout";
	return axios.get(url, header).then(function (response) {
		console.log(response)
	}).catch(function (error) {
		console.log(error)
	})
}


export const pickCard = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		// var url = Ultilities.base_url() + "/awardSpin?spinId=" + id + "&scoinToken=" + scoinToken;
		var url = Ultilities.base_url() + "darts/spin/?userToken=" + token;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: LUCKY_PICK_RESPONSE,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}



export const getItemAward = (token, award_id) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"token": token,
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "darts/user-get-award?award-id=" + award_id;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: ITEM_AWARD,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}





function encrypt(msg, pass) {
    var salt = window.CryptoJS.lib.WordArray.random(saltSize / 8);

    var key = window.CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    var iv = window.CryptoJS.lib.WordArray.random(ivSize / 8);

    var encrypted = window.CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: window.CryptoJS.pad.Pkcs7,
        mode: window.CryptoJS.mode.CBC

    });

    var encryptedHex = base64ToHex(encrypted.toString());
    var base64result = hexToBase64(salt + iv + encryptedHex);


    return base64result;
}

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

function base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
}
