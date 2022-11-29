export function listFetchDataSuccess(list) {
  return {
    type: "LIST_SUCCESS",
    list
  }
}

export function listFetchData(url) {
  return (dispatch) => {
    fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response
        })
        .then(response => response.json())
        .then(list => dispatch(listFetchDataSuccess(list)))
  }
}
