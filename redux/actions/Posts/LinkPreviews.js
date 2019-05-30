import LinkPreview from 'react-native-link-preview'

export const GET_LINK_PREVIEW = "GET_LINK_PREVIEW"

const getLinkPreview = (post_id, response) => ({
    type: GET_LINK_PREVIEW,
    post_id,
    response
})

export const requestLinkPreviewfromApi = (post_id, post_text) => ((dispatch, getState) => {
    linkPreviewExists = getState().linkPreviews[post_id] === undefined ? false : true
    if(linkPreviewExists) {
        return
    } else {
        LinkPreview.getPreview(post_text)
        .then(response => dispatch(getLinkPreview(post_id, response)))
    }
})