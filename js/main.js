/**
 * 2.歌曲查询
 * 歌曲url：https://autumnfish.cn/song/url
 * 请求方法：get
 * 请求参数：id（查询关键字）
 * 相应内容：歌曲url地址
 */

/*
 *  3.歌曲封面
 *  https://autumnfish.cn/song/detail 
 * 请求方法：get
 * 请求参数ids（歌曲id）
 * 响应内容：歌曲详情，包含封面信息
 */
/**
 * 4.歌曲评论
 * https://autumnfish.cn/comment/hot?type=0
 * 请求方法：get
 * 需要参数：id
 */
/**
 * 5.mv播放
 * https://autumnfish.cn/mv/url
 * get
 * 参数  id mvid=0说明没有mv
 */
var app = new Vue({
    el:"#player",
    data:{
        //查询关键字
        query:"",
        //歌曲数组
        musicList:[],
        // 歌曲地址
        musicUrl:"",
        //歌曲封面
        musicCover:"",
        // 歌曲评论
        hotComments:"",
        // 动画播放状态
        isPlaying:false,
        //遮罩层的显示状态
        isShow:false,
        //mv地址
        mvUrl:"",
        

    },
    methods:{
        searchMusic:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+ this.query)
            .then(function(response){
                // console.log(response);
                that.musicList = response.data.result.songs;
            },function(err){});
            this.query ='';
        },
        playMusic:function(musicId){
            // console.log(musicId);
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                // console.log(response.data.data[0].url);
                that.musicUrl=response.data.data[0].url;
            },function(err){});

            // 歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response){
                // console.log(response.data.songs[0].al.picUrl);
                that.musicCover = response.data.songs[0].al.picUrl;
            },function(err){});
            
            //歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
                 console.log(response.data.hotComments);
                that.hotComments=response.data.hotComments;
            },function(err){})
        },
        play:function(){
            // console.log("play");
            this.isPlaying = true;
        },
        pause:function(){
            console.log("pause");
            this.isPlaying = false;
            this.$refs.audio.pause();
            
        },
        // 播放mv 有参数
        playMV:function(mvid){
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+ mvid)
            .then(function(response){
                // console.log(response);
                // console.log(response.data.data.url);
                that.isShow = true;
                that.mvUrl = response.data.data.url;
            },function(err){})
        },
        // 隐藏
        hide:function(){
            this.isShow = false;
            this.$refs.video.pause();
        }
    }
})