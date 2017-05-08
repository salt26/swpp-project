import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {writeArticle, postLike, articleDetail} from '../../actions'

class Article extends React.Component {
    render() {
        const writerId = "a"+this.props.article.id+"_writer_field"
        const username = this.props.article.owner
        const textId = "a"+this.props.article.id+"_text_field"
        const articleText = this.props.article.text
        const likeNum = this.props.article.like_num
        const likeNumId = "a"+this.props.article.id+"_like_field"
        const likeButtonId = "a"+this.props.article.id+"_like_button_field"
        const editButtonId = "a"+this.props.article.id+"_edit_button_field"
        const deleteButtonId = "a"+this.props.article.id+"_delete_button_field"
        const replyNum = this.props.article.children_num
        const replyNumId = "a"+this.props.article.id+"_reply_field"
        const replyButtonId = "a"+this.props.article.id+"_reply_button_field"
        const detailButtonId = "a"+this.props.article.id+"_detail_button_field"
        const componentId = "a"+this.props.article.id+"_field"
        const createdId = "a"+this.props.article.id+"_created_field"
        const updatedId = "a"+this.props.article.id+"_updated_field"
        return (
                <div id={componentId}>
                    <p id={writerId}>id: {username}</p>
                    <div id={textId} className="article_text">{articleText}</div>
                    <p id={createdId}>Created: {this.props.article.created_time}</p>
                    <p id={updatedId}>Last update: {this.props.article.updated_time}</p>
                    좋아요: <span id={likeNumId}>{likeNum}</span><button id={likeButtonId} onClick={() => this.props.onLikeClick(this.props.article.id, this.props.authorization)}>Like</button>
                    <button id={editButtonId} onClick={this.props.onEditClick}>Edit</button>
                    <button id={deleteButtonId} onClick={this.props.onDeleteClick}>Delete</button>
                    <br />
                    댓글: <span id={replyNumId}>{replyNum}</span><button id={detailButtonId} onClick={() =>this.props.onDetailClick(this.props.article)}>Detail</button>
                    <br />
                    <button id={replyButtonId} onClick={() =>this.props.onReplyClick(this.props.article)}>Reply</button>
                </div>
               )
    }
}

let mapStateToProps = (state) => {
    return {
        authorization: Object.assign(state.authorization)
    }
}

Article.propTypes = {
    article: PropTypes.object,
}

let mapDispatchToProps = (dispatch) => {
    return {
        onDeleteClick: () => alert("Delete button cliked"),
        onEditClick: () => alert("Edit button clicked"),
        onReplyClick: (id) => dispatch(writeArticle(id)),
        onLikeClick: (id, auth) => dispatch(postLike(id, auth)),
        onDetailClick: (id) => dispatch(articleDetail(id))
    }
}

//Article = connect(undefined, mapDispatchToProps)(Article)

Article = connect(mapStateToProps, mapDispatchToProps)(Article)

export default Article
