var postsData = require('../../../data/posts-data.js')
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlayingMusic : false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { 
        //获取页面跳转传入的参数
        var postId = options.id;
        this.data.currentPostId= postId;
        var postData = postsData.postList[postId];
        this.setData({
            postData: postData
        });

        var postsCollected = wx.getStorageSync('posts_collected')
        if(postsCollected){
            var postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected
            });
        }else{
            var postsCollected = {}
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }

        if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
            this.setData({
                isPlayingMusic : true
            })
        }
        this.setMusicMonitor();
    },

    setMusicMonitor: function(){
        var that = this;
        wx.onBackgroundAudioPlay(function(){
            that.setData({
                isPlayingMusic : true
            })
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = that.data.currentPostId;
        });

        wx.onBackgroundAudioPause(function(){
            that.setData({
                isPlayingMusic : false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        });
    },

    onCollectionTap: function(event){
        //同步方法调用
        this.getPostsCollectedSyc();
        //异步方法调用
        // this.getPostsCollectedAsy();
    },

    getPostsCollectedSyc: function(event){
        var postsCollected = wx.getStorageSync('posts_collected')
        var postCollected = postsCollected[this.data.currentPostId];
        //收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected;
        //更新文章是否的缓存值
        wx.setStorageSync('posts_collected', postsCollected);
        //更新数据绑定变量，从而实现切换图片
        this.setData({
            collected: postCollected
        })
        
        wx.showToast({
            title: postCollected?'收藏成功':'取消成功',
            icon: 'success',
            duration: 2000
          })
    },

    getPostsCollectedAsy: function(){
        var that = this;
        wx.getStorage({
            key: 'posts_collected',
            success: function(res){
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId];
                //收藏变成未收藏，未收藏变成收藏
                postCollected = !postCollected;
                postsCollected[that.data.currentPostId] = postCollected;
                //更新文章是否的缓存值
                wx.setStorageSync('posts_collected', postsCollected);
                //更新数据绑定变量，从而实现切换图片
                that.setData({
                    collected: postCollected
                })

                wx.showToast({
                    title: postCollected?'收藏成功':'取消成功',
                    icon: 'success',
                    duration: 2000
                  })
            }
        })
    },

    onShareTap:function(event){
        var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ];
        wx.showActionSheet({
          itemList: itemList,
          itemColor:"#405f80",
          success:function(res){
              //res.cancel 用户是不是点击了取消
              //res.tapIndex 数组元素的序号，从0开始
              wx.showModal({
                title: "用户 " + itemList[res.tapIndex],
                content: "用户是否取消？"+ res.cancel +"现在无法实现分享功能，什么时候能支持呢"
              })
          }
        })
    },

    onMusicTap:function(){
        var isPlayingMusic = this.data.isPlayingMusic;
        if(isPlayingMusic){
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic : false
            })
        }
        else{
            wx.playBackgroundAudio({
                dataUrl: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
                title: '速度与激情-Paul',
                coverImgUrl: 'http://n.sinaimg.cn/sinacn/w640h601/20171225/34e9-fypyuvc0615231.jpg'
              })
              this.setData({
                isPlayingMusic : true
            })
        }
    }
})