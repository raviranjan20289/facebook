
const User = require('../models/user');

const Sent = require('../models/sent');

const Pending = require('../models/pending');






exports.addFriend = async (req, res) => {
    try {
      const { uname } = req.params;
      const loggedInUserId = req.userId;
  
      const loggedInUser = await User.findById(loggedInUserId);
      console.log(loggedInUser)
      const searchedUser = await User.findOne({ username: uname });
      
      if (!searchedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

     const searchedUserId = searchedUser._id;
 

      const sentRequest = new Sent({
        from: loggedInUserId,
        to: searchedUserId
      });
  
      const pendingRequest = new Pending({
        from: loggedInUser,
        to: searchedUserId
      });
  
      await sentRequest.save();
      await pendingRequest.save();
  
      res.redirect(`/api/user/searchedUser?search=${uname}`);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

