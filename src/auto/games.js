
const fs = require("fs");
module.exports = {
  async execute() {
    if (!fs.existsSync(`./data/tictactoe.json`)) {
      await makegamefile();
    }
    const gameChecks = async () => {
      const database = JSON.parse(
        fs.readFileSync(`./data/tictactoe.json`)
      );
      for (const game of database.gameArray) {
        if (game.timeEnded < new Date().getTime()) {
          database.gameArray.splice(database.gameArray.indexOf(game), 1);
          console.log("ended a game");
          database.timeout = database.timeout + 1;
        }
      }
      fs.writeFileSync(
        `./data/tictactoe.json`,
        JSON.stringify(database, null, 2)
      );
      setTimeout(gameChecks, 1000 * 10);
    };
    gameChecks();
  },
};


async function makegamefile()
{
  let data = {
    total: 0,
    finished: 0,
    playing: 0,
    ammountInArray: 0,
    timeout: 0,
    gameArray: [],
  };
  let dataJSON = JSON.stringify(data, null, 2);
  await fs.writeFileSync(`./data/tictactoe.json`, dataJSON);
}