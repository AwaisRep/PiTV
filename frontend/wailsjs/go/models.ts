export namespace client {
	
	export class XtreamData {
	    Profile: models.Profile;
	    LiveCategories: xtreamcodes.Category[];
	    VideoCategories: xtreamcodes.Category[];
	    SeriesCategories: xtreamcodes.Category[];
	    LiveStreams: xtreamcodes.Stream[];
	    VODStreams: xtreamcodes.Stream[];
	    SeriesStreams: xtreamcodes.SeriesInfo[];
	    // Go type: time
	    LastFetched: any;
	
	    static createFrom(source: any = {}) {
	        return new XtreamData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Profile = this.convertValues(source["Profile"], models.Profile);
	        this.LiveCategories = this.convertValues(source["LiveCategories"], xtreamcodes.Category);
	        this.VideoCategories = this.convertValues(source["VideoCategories"], xtreamcodes.Category);
	        this.SeriesCategories = this.convertValues(source["SeriesCategories"], xtreamcodes.Category);
	        this.LiveStreams = this.convertValues(source["LiveStreams"], xtreamcodes.Stream);
	        this.VODStreams = this.convertValues(source["VODStreams"], xtreamcodes.Stream);
	        this.SeriesStreams = this.convertValues(source["SeriesStreams"], xtreamcodes.SeriesInfo);
	        this.LastFetched = this.convertValues(source["LastFetched"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace models {
	
	export class Profile {
	    ID: number;
	    // Go type: time
	    CreatedAt: any;
	    // Go type: time
	    UpdatedAt: any;
	    // Go type: gorm
	    DeletedAt: any;
	    id: number;
	    name: string;
	    login_type: number;
	    url: string;
	    host: string;
	    username: string;
	    password: string;
	
	    static createFrom(source: any = {}) {
	        return new Profile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.CreatedAt = this.convertValues(source["CreatedAt"], null);
	        this.UpdatedAt = this.convertValues(source["UpdatedAt"], null);
	        this.DeletedAt = this.convertValues(source["DeletedAt"], null);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.login_type = source["login_type"];
	        this.url = source["url"];
	        this.host = source["host"];
	        this.username = source["username"];
	        this.password = source["password"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace xtreamcodes {
	
	export class Category {
	    category_id: number;
	    category_name: string;
	    parent_id: number;
	
	    static createFrom(source: any = {}) {
	        return new Category(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.category_id = source["category_id"];
	        this.category_name = source["category_name"];
	        this.parent_id = source["parent_id"];
	    }
	}
	export class JSONStringSlice {
	
	
	    static createFrom(source: any = {}) {
	        return new JSONStringSlice(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	
	    }
	}
	export class Timestamp {
	
	
	    static createFrom(source: any = {}) {
	        return new Timestamp(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	
	    }
	}
	export class SeriesInfo {
	    backdrop_path?: JSONStringSlice;
	    cast: string;
	    category_id?: number;
	    cover: string;
	    director: string;
	    episode_run_time: string;
	    genre: string;
	    last_modified?: Timestamp;
	    name: string;
	    num: number;
	    plot: string;
	    rating: number;
	    rating_5based: number;
	    releaseDate: string;
	    series_id: number;
	    stream_type: string;
	    youtube_trailer: string;
	
	    static createFrom(source: any = {}) {
	        return new SeriesInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.backdrop_path = this.convertValues(source["backdrop_path"], JSONStringSlice);
	        this.cast = source["cast"];
	        this.category_id = source["category_id"];
	        this.cover = source["cover"];
	        this.director = source["director"];
	        this.episode_run_time = source["episode_run_time"];
	        this.genre = source["genre"];
	        this.last_modified = this.convertValues(source["last_modified"], Timestamp);
	        this.name = source["name"];
	        this.num = source["num"];
	        this.plot = source["plot"];
	        this.rating = source["rating"];
	        this.rating_5based = source["rating_5based"];
	        this.releaseDate = source["releaseDate"];
	        this.series_id = source["series_id"];
	        this.stream_type = source["stream_type"];
	        this.youtube_trailer = source["youtube_trailer"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Stream {
	    added?: Timestamp;
	    category_id: number;
	    category_name: string;
	    container_extension: string;
	    custom_sid: string;
	    direct_source?: string;
	    epg_channel_id: string;
	    stream_icon: string;
	    stream_id: number;
	    name: string;
	    num: number;
	    rating: number;
	    rating_5based: number;
	    tv_archive: number;
	    tv_archive_duration?: number;
	    stream_type: string;
	
	    static createFrom(source: any = {}) {
	        return new Stream(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.added = this.convertValues(source["added"], Timestamp);
	        this.category_id = source["category_id"];
	        this.category_name = source["category_name"];
	        this.container_extension = source["container_extension"];
	        this.custom_sid = source["custom_sid"];
	        this.direct_source = source["direct_source"];
	        this.epg_channel_id = source["epg_channel_id"];
	        this.stream_icon = source["stream_icon"];
	        this.stream_id = source["stream_id"];
	        this.name = source["name"];
	        this.num = source["num"];
	        this.rating = source["rating"];
	        this.rating_5based = source["rating_5based"];
	        this.tv_archive = source["tv_archive"];
	        this.tv_archive_duration = source["tv_archive_duration"];
	        this.stream_type = source["stream_type"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

