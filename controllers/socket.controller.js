const { POLLDATA } = require("../utils/constants");
let livePollData = {};
let userMessages = []; //{user:user,message:""}[]
POLLDATA.map((pollItem, idx) => {
  const options = pollItem.options.map((item, i) => ({ id: i, vote: 0 }));
  const users = [];
  livePollData[idx] = { options, users };
});
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected with id ${socket.id}`);
    /*
      {1:{options:[{id,vote},...], users:[userName]}}
    */

    console.log("____________current total votes___________");
    console.log(livePollData[0].options);
    socket.on("polling", (stream) => {
      /* {
            question_id,
            option_id,
            userName
           }
      */
      let { userName, question_id, option_id } = stream;
      console.log(userName);
      console.log(livePollData[question_id].users);
      let isPolled = false;
      for (let i = 0; i < livePollData[question_id].users.length; i++) {
        if (livePollData[question_id].users[i] === userName) {
          isPolled = true;
        }
      }

      console.log(isPolled);
      if (!isPolled) {
        livePollData[question_id].options[option_id].vote += 1;
        livePollData[question_id].users.push(userName);
        console.log(livePollData[question_id].options[option_id].vote);
        io.emit("votingended", {
          pollData: livePollData[question_id],
          questionData: POLLDATA.at(question_id),
          question_id,
        });
      } else {
        io.emit("votingended", {
          pollData: livePollData[question_id],
          questionData: POLLDATA.at(question_id),
          question_id,
        });
      }
    });

    socket.on("message", (stream) => {
      const { message, userName } = stream;
      userMessages.push({ message, user: userName });
      console.log(userMessages);
      io.emit("messageSignal", userMessages);
    });
  });
};
