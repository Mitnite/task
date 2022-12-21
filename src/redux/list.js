import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

export function list(state = [], action) {

  switch (action.type) {
    case "LIST_SUCCESS":
      let posts
      if (state) {
        const new_list = [...state]
        posts = [].concat(new_list, action.list.results)
      } else posts = action.list.results
      return posts;

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