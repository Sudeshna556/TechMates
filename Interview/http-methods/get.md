you’ll create GET API handlers whenever your client (mobile app or frontend) needs to fetch data without changing it. Think of GET as “read‑only” operations in your backend request lifecycle.

- Fetching user profiles
     Example: GET /users/:id → returns profile info, bio, followers count.
- Fetching posts (feed or individual)
     Example: GET /posts → returns a list of posts for the feed.
     Example: GET /posts/:id → returns details of a single post.
- Fetching comments on a post
     Example: GET /posts/:id/comments → returns all comments for that post.
- Fetching likes
     Example: GET /posts/:id/likes → returns users who liked the post.
- Fetching followers/following lists
     Example: GET /users/:id/followers → returns all followers of a user.
- Fetching notifications
     Example: GET /notifications → returns recent activity for the logged‑in user.
Rule of thumb 🛠️
    - Use GET when you’re retrieving data (profiles, posts, comments, feeds).
    - Use POST/PUT/DELETE when you’re changing data (creating posts, liking, following, commenting).

>GET handlers are the backbone of reading content: profile pages, feeds, explore tab, comments, likes, followers.

# GET API handler for fetching a user’s feed 
Route: GET /users/:id/feed → fetches posts for a given user’s feed.
- Logic:
- Extract user ID from URL.
- Find all accounts the user follows.
- Collect posts from those accounts.
- Return them as JSON.


```js
const express = require('express');
const app = express();

// Mock data (replace with DB queries)
const posts = [
  { id: 1, userId: 2, caption: 'Sunset vibes 🌅', imageUrl: '/images/sunset.jpg' },
  { id: 2, userId: 3, caption: 'Coffee time ☕', imageUrl: '/images/coffee.jpg' },
  { id: 3, userId: 2, caption: 'Beach day 🏖️', imageUrl: '/images/beach.jpg' }
];

const follows = [
  { followerId: 1, followingId: 2 },
  { followerId: 1, followingId: 3 }
];

// GET handler to fetch feed for a user
app.get('/users/:id/feed', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  // Find who this user follows
  const followingIds = follows
    .filter(f => f.followerId === userId)
    .map(f => f.followingId);

  // Get posts from those users
  const feedPosts = posts.filter(p => followingIds.includes(p.userId));

  res.json(feedPosts);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```
response:
[
  { "id": 1, "userId": 2, "caption": "Sunset vibes 🌅", "imageUrl": "/images/sunset.jpg" },
  { "id": 2, "userId": 3, "caption": "Coffee time ☕", "imageUrl": "/images/coffee.jpg" },
  { "id": 3, "userId": 2, "caption": "Beach day 🏖️", "imageUrl": "/images/beach.jpg" }
]

//get api handler for fetching a user’s profile

app.get("/user/:id",async(req,res)=>{
    try{
  //db query to fetch user
   const userId =  req.params.id;
   const user = await User.findById(userId);
   if(!user){
    return res.status(404).json({message:"User not found"})
   }
   res.json(user);
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})