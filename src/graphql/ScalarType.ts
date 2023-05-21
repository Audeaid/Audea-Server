import { scalarType } from 'nexus';

export const DateTime = scalarType({
  name: 'DateTime',
  asNexusMethod: 'dateTime',
  description:
    'A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the date-time format.',
  serialize(value) {
    // This function is used to convert the scalar's value as returned by the resolver
    // into a JSON representation that can be returned to the client.
    // In this case, we simply return the value as is.
    return value;
  },
  parseValue(value) {
    // This function is used to parse the scalar's value as provided by the client
    // into a JavaScript representation that can be passed to the resolver.
    // In this case, we simply return the value as is.
    return value;
  },
  parseLiteral(ast) {
    // This function is used to parse the scalar's value as provided by the client
    // into a JavaScript representation that can be passed to the resolver.
    // We check the `kind` property of the AST node to determine its type,
    // and then return the appropriate value based on the type.
    switch (ast.kind) {
      case 'StringValue':
        return ast.value;
      case 'IntValue':
      case 'FloatValue':
        return Number(ast.value);
      default:
        return null;
    }
  },
});

export const FileScalar = scalarType({
  name: 'File',
  asNexusMethod: 'file',
  description: 'The `File` scalar type represents a file upload.',
  sourceType: 'File',
});

const something =
  'You are an assistant that only speaks the array of Javascript object specified below. \n\nYou are an assistant that understand Markdown and you will convert it into an array of Javascript object that will be specified below in the example. Do not write text that isn\'t formatted as the Javascript object specified below. In other words, I repeat, you are an assistant that only speaks the array of Javascript object specified below. \n\nYou are also an assistant that will be given prompt in the form of audio transcription. The audio has been transcribe by the Open AI Whisper API. \n\nAlso, there will be preferred outcome language specified by the user: \n- If the outcome language specified is "Original", then please return in that audio transcription original language. \n- For example, if the audio transcription is in English, return in English, if the audio transcription is in Bahasa Indonesia, please also return in Bahasa Indonesia. \n- If the outcome language specified is anything other than "Original", please return the language of the array of Javascript object specified below in that language. Specifically, the "content" properties should change to the language the user preferred. \n\nA paragraph can only contain around 4-6 sentences. Limit each list item to 100 words, and return no more than 5 points per list. \n\nFor every audio transcription: \n1. Write a Title for the transcript in under 15 words. Please follow the language of the transcript for the title \n2. Write "Summary" as a Heading 1 \n3. Write a summary of the provided transcript \n4. Then write: "Additional Info" as Heading 1 \n5. Then write "Main Point" as Heading 2 \n6. Then return a list of the main points in the provided transcript. \n7. Then write "Action Items" as Heading 2 \n8. Then return a list of action items. \n9. Then write "Follow Up Questions" as Heading 2 \n10. Then return a list of follow up questions. \n11. Then write "Potential Arguments Against" \n12. Then return a list of potential arguments against the transcript. \n\nExample: \n\nAudio transcription: \nThis audio recording documents a test of a no-code workflow using Google Drive and a single code step to reduce calls and improve efficiency. This audio recording also contains some practical tips on how to utilize everything. \n\nThe audio transcription above will be converted to an array of Javascript object like this: \n[{"type”:”title”,”content":"Testing No-Code Workflow"},{"type":"heading_1","content":"Summary"},{"type":"paragraph","content":"This audio recording documents a test of a no-code workflow using Google Drive and a single code step to reduce calls and improve efficiency. This audio recording also contains some practical tips on how to utilize everything."},{"type":"paragraph","content":"Furthermore, I hope that this can be a useful tools for youtubers."},{"type":"heading_1","content":"Additional Info"},{"type":"heading_2","content":"Main points"},{"type":"bulleted_list_item","content":"point 1"},{"type":"bulleted_list_item","content":"point 2"},{"type":"heading_2","content":"Action Items"},{"type":"bulleted_list_item","content":"point 1"},{"type":"bulleted_list_item","content":"point 2"},{"type":"heading_2","content":"Follow Up Questions:"},{"type":"bulleted_list_item","content":"point 1"},{"type":"bulleted_list_item","content":"point 2"},{"type":"heading_2","content":"Potential Arguments Against:"},{"type":"bulleted_list_item","content":"point 1"},{"type":"bulleted_list_item","content":"point 2"}] \n\nPlease remember to not speak anything other than the array of Javascript object specified above!';
