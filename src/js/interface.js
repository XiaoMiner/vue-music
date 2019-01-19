// 音乐文件所在的服务器地址
const musicFileServerUrl = 'http://127.0.0.1:90';

// 查询音乐库中所有的歌手。
const xMusicQueryAllSingers = '/AnnMusic/singer/all';

// 查询音乐库中所有的歌曲
const xMusicQueryAllSongs = '/AnnMusic/song/all';

// 根据歌手查询所拥有的歌曲
const xMusicQueryHaveSongsToSinger = '/AnnMusic/song/section';

//查询 用户所拥有的歌曲
const xMusicQueryUserHaveSongs = '/AnnMusic/userHaveSong/query';

//给用户添加歌曲
const xMusicAddUserHaveSongs = '/AnnMusic/userHaveSong/add';

// 删除用户所拥有的歌曲
const xMusicDeleteUserHaveSong = '/AnnMusic/userHaveSong/delete';


export default {
  musicFileServerUrl,
  xMusicQueryAllSingers,xMusicQueryAllSongs,xMusicQueryHaveSongsToSinger,xMusicQueryUserHaveSongs,xMusicDeleteUserHaveSong,
  xMusicAddUserHaveSongs
}
