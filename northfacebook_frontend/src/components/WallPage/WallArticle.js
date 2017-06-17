import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {toProfile, editArticle, deleteArticle, writeArticle, postLike, articleDetail} from '../../actions'

class WallArticle extends React.Component {
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

        const created_ = this.props.article.created_time.split('T');
        const created_date = created_[0].split('-');
        const created_time = created_[1].split(':');
        const updated_ = this.props.article.created_time.split('T');
        const updated_date = updated_[0].split('-');
        const updated_time = updated_[1].split(':');

        const imgId = 'a'+this.props.article.id+'_images';
        const images = this.props.article.images;
        const profileId = 'a'+this.props.article.id+'_profile_img';

        const labelId = "a"+this.props.article.id+"_label";
        const current = this.props.current.toString()
        const typeLabel = () => {
            if(this.props.article.owner !== current)
                return (
                        <div>
                            <p id={labelId}>{current}가 좋아요한 글입니다.</p>
                        </div>
                       )
            else if(this.props.article.depth !== 0)
                return (
                        <div>
                            <p id={labelId}>{current}가 작성한 댓글입니다.</p>
                        </div>
                       )
            else
                return (
                        <div>
                            <p id={labelId}>{current}가 작성한 글입니다.</p>
                        </div>
                       )
        }
        const css = this.props.article.depth === 0 ? 'Article' : this.props.article.depth === 1 ? 'ArticleArticle' : 'ArticleArticleArticle';
        return (
                <div id={componentId} className={css}>
                    {typeLabel()}
                    <img src={this.props.article.owner_img} alt='' id={profileId} className='PROFILEIMG' />
                    <a id={writerId} className="Link" onClick={() => this.props.onProfileClick(username)}>{username}</a>
                    <hr />
                    <div id={imgId}>
                    {images.map((img) => <img key={"img"+imgId} src={img} alt=""/>)}
                    </div>
                    <div id={textId} className="article_text">{articleText.split('\n').map( (line,textId) => {return (<span key={'line'+textId}>{line}<br/></span>)} )}</div>
                    <hr />
                    <p id={createdId}>작성일: {created_date[0]}년 {created_date[1]}월 {created_date[2]}일 {created_time[0]}시 {created_time[1]}분 {created_time[2].split('.')[0]}초</p>
                    <p id={updatedId}>최근 수정일: {updated_date[0]}년 {updated_date[1]}월 {updated_date[2]}일 {updated_time[0]}시 {updated_time[1]}분 {updated_time[2].split('.')[0]}초</p>
                     <div className="Tags">
                    좋소: <span id={likeNumId}>{likeNum}</span>
                    <div className="divider"/>
                    <button id={likeButtonId} onClick={() => this.props.onLikeClick(this.props.article.id, this.props.authorization)}>좋소</button>
                    <div className="divider"/>
                    <button id={editButtonId} onClick={ ()=>this.props.onEditClick(this.props.article.id,this.props.article.text)}>수정</button>
                    <div className="divider"/>
                    <button id={deleteButtonId} onClick={() => this.props.onDeleteClick(this.props.article.id)}>삭제</button>
                    <br />
                    댓글:<span id={replyNumId}>{replyNum}</span>
                    <div className="divider"/>
                    {this.props.article.depth === 0 ? <button id={detailButtonId} onClick={() =>this.props.onDetailClick(this.props.article)}>자세히 보기</button> : null}
                    <div className="divider"/>
                    {this.props.article.depth < 2 ? <button id={replyButtonId} onClick={() =>this.props.onReplyClick(this.props.article)}>댓글</button> : null}
                    <br />
                    </div>
                </div>
               )
    }
}

let mapStateToProps = (state) => {
    return {
        authorization: Object.assign(state.authorization),
        current: state.propfile_user !== null ? Object.assign(state.profile_user.username) : null
    }
}

WallArticle.propTypes = {
    article: PropTypes.object,
}

let mapDispatchToProps = (dispatch) => {
    return {
        onDeleteClick: (id) => dispatch(deleteArticle(id)), 
        onEditClick: (id,text,time) => dispatch(editArticle(id,text)), 
        onReplyClick: (id) => dispatch(writeArticle(id)),
        onLikeClick: (id, auth) => dispatch(postLike(id, auth)),
        onDetailClick: (id) => dispatch(articleDetail(id)),
        onProfileClick: (profuser) => dispatch(toProfile(profuser))
    }
}

WallArticle = connect(mapStateToProps, mapDispatchToProps)(WallArticle)

export default WallArticle;
