const fs = require('fs');
const yaml = require('yaml-front-matter');
const GitHub = require('octocat');
const challenges = [];
require('dotenv').config();
const client = new GitHub({
  token: process.env.OCTOCAT_KEY
});
(async () => {
  let current_data = await client.get(`/gists/${process.env.GIST_ID}`);
  current_data = current_data.body.files['CodingChallenge_Variations.md'].content
  const yaml_files = fs.readdirSync('_CodingChallenges');
  for (const yaml_file of yaml_files) {
    const content = fs.readFileSync(`./_CodingChallenges/${yaml_file}`, 'UTF8');
    const parsed_content = yaml.loadFront(content);
    challenges.push({
      id: parsed_content.video_number,
      title: parsed_content.title,
      repo: parsed_content.repository || null,
      p5: false,
      processing: false,
      web_editor: parsed_content.web_editor || false,
      other: false
    });
  }

  let result_table = '| Number | Name | p5.js | Web Editor | Processing | Other | Folder |\n| --- | --- | --- | --- | --- | --- | --- | \n';

  for (const challenge of challenges) {
    if (!challenge.repo) continue;
    const subdirectories = fs.readdirSync(`./CodingChallenges/${challenge.repo}`);

    let line = `| ${challenge.id} | ${challenge.title} | `;

    console.log(`Processing Challenge ${challenge.id}: ${challenge.title}`);
    //p5.js
    if (subdirectories.includes('P5')) {
      challenge.p5 = true;
      line += '<ul><li> - [x] </li></ul> |';
    } else {
      line += '<ul><li> - [ ] </li></ul> |';
    };

    //Web Editor
    if (challenge.web_editor) {
      line += '<ul><li> - [x] </li></ul> |';
    } else {
      line += '<ul><li> - [ ] </li></ul> |';
    }

    //Processing
    if (subdirectories.includes('Processing')) {
      challenge.processing = true;
      line += '<ul><li> - [x] </li></ul> |';
    } else {
      line += '<ul><li> - [ ] </li></ul> |';
    };

    //Other
    const others = ['Node', 'JavaScript'];
    others.forEach(elt => {
      if (subdirectories.includes(elt)) challenge.other = true;
    });
    if (challenge.other) {
      line += '<ul><li> - [x] </li></ul> |';
    } else {
      line += '<ul><li> - [ ] </li></ul> |';
    }

    line += `${challenge.repo} \n`
    result_table += line;
  }

  if (current_data === result_table) {
    console.log('\x1b[35m', 'Aborting. The data has not changed.');
    process.exit(0);
  }

  //Obsolete since the result has moved to GitHub Gists
  // if (fs.existsSync('CodingChallenge_Variations.md')) {
  //   fs.unlinkSync('CodingChallenge_Variations.md');
  // }
  // fs.writeFileSync('CodingChallenge_Variations.md', result_table, 'UTF8');

  //Upload content to GitHub Gist
  console.log('\x1b[32m', `Uploading result to GitHub Gist. Gist ID: ${process.env.GIST_ID}`);
  client.patch(`/gists/${process.env.GIST_ID}`, {
    files: {
      'CodingChallenge_Variations.md': {
        content: result_table
      }
    }
  });
})();