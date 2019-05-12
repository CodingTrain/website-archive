const fs = require('fs');
const yaml = require('yaml-front-matter');

const results = [];

(() => {
  const yaml_files = fs.readdirSync('_CodingChallenges');
  for (const yaml_file of yaml_files) {
    const content = fs.readFileSync(`./_CodingChallenges/${yaml_file}`, 'UTF8');
    const parsed_content = yaml.loadFront(content);
    results.push({
      id: parsed_content.video_number,
      title: parsed_content.title,
      repo: parsed_content.repository || null,
      p5: false,
      processing: false,
      web_editor: parsed_content.web_editor || false,
      other: false
    });
  }

  let result_table =
    '| Number | Name | p5.js | Web Editor | Processing | Other |\n';
  result_table +=
    '| --- | --- | --- | --- | --- | --- | \n';

  for (const result of results) {
    if (!result.repo) continue;
    const subdirectories = fs.readdirSync(`./CodingChallenges/${result.repo}`);

    let line = `| ${result.id} | ${result.title} | `;

    //p5.js
    if (subdirectories.includes('P5')) {
      result.p5 = true;
      line += '<ul><li> - [x] </li></ul> |';
    } else {
      line += '<ul><li> - [ ] </li></ul> |';
    };

    //Web Editor
    if (result.web_editor) {
      line += '<ul><li> - [x] </li></ul> |';
    } else {
      line += '<ul><li> - [ ] </li></ul> |';
    }

    //Processing
    if (subdirectories.includes('Processing')) {
      result.processing = true;
      line += '<ul><li> - [x] </li></ul> |';
    } else {
      line += '<ul><li> - [ ] </li></ul> |';
    };

    //Other
    const others = ['Node', 'JavaScript'];
    others.forEach(elt => {
      if (subdirectories.includes(elt)) result.other = true;
    });
    if (result.other) {
      line += '<ul><li> - [x] </li></ul> |';
    } else {
      line += '<ul><li> - [ ] </li></ul> |';
    }

    line += '\n'
    result_table += line;
  }

  if (fs.existsSync('CodingChallenge_Variations.md')) {
    fs.unlinkSync('CodingChallenge_Variations.md');
  }
  fs.writeFileSync('CodingChallenge_Variations.md', result_table, 'UTF8');
})();