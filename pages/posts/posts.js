var postsData = require('../../data/posts-data.js')

Page({
    //产生事件 捕捉时间 回调函数 处理事件
    /**
     * 页面的初始数据
     */
    data: {
    },

    onPostTap: function(event){
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
          url: '../posts/post-detail/post-detail?id=' + postId
        })
    },

    onSwiperTap: function(event){
        var postId = event.target.dataset.postid; 
        wx.navigateTo({
            url: '../posts/post-detail/post-detail?id=' + postId
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    
        //绑定到data数据源中去
         this.setData(
            {posts_key: postsData.postList}
        ); 
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})