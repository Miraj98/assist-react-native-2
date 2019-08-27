import { FETCH_LINK_PREVIEWS } from '../actionTypes';
import LinkPreview from 'react-native-link-preview';

const linkPreviewsFetched = (linkPreview, post_id) => ({
  type: FETCH_LINK_PREVIEWS,
  linkPreview,
  post_id
})

export const requestLinkPreviewsFromApi = (post_id, post_text) => (async (dispatch, getState) => {
  const linkPreviewExists = getState().posts.linkpreviews[post_id] === undefined ? false : true;
  if(!linkPreviewExists) {
    const response = await LinkPreview.getPreview(post_text);
    dispatch(linkPreviewsFetched(response, post_id))
  }
})