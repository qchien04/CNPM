import Post from "../../../Components/Post";
import PostNewStatusBar from "../../../Components/PostNewStatusBar";
import "./HomePage.css"
const HomePage=()=>{
    return(
        <>
            <div className="home_post_list">
                <PostNewStatusBar/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            
          </div>  
        </>
    )
}

export default HomePage;