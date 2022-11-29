export function list(state = [], action) {

  switch (action.type) {
    case "LIST_SUCCESS":
      return action.list;

    case 'LIKED':

      const picture_like = [...state]
      picture_like[action.payload].liked = !picture_like[action.payload].liked
      return picture_like

    case 'DELETE':
      const picture_delete = [...state]
      picture_delete.splice(action.payload, 1)
      return picture_delete

    default:
      return state
  }
}