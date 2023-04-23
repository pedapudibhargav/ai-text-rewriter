const emotions = [
  { 
    zone: 'green',
    overall: 'great',
    subCategories: ['happy', 'excited', 'calm', 'okay', 'focused'],
    emojis: ['😁', '😃', '😌', '👍', '😇'],
    // backgroundColor: ['#4e9713', '#baee2e'] ,
    backgroundColor: ['#ffa7bd', '#ffa7bd'] ,
    primaryImages: [
      './images/moods/happy.png'
    ]
  },
  { 
    zone: 'yellow',
    overall: 'ok',
    subCategories: ['neutral', 'moderate', 'stable', 'composed', 'content'], 
    emojis: ['🙂', '🤓', '🥸', '😐', '😶'],
    // backgroundColor: ['#019eb7', '#06b678'] ,
    backgroundColor: ['#fee281', '#fee281'] ,
    primaryImages: [
      './images/moods/ok.png'
    ]
  },
  { 
    zone: 'blue', 
    overall: 'not ok',
    subCategories: ['sad', 'depressed', 'sick', 'tired', 'uncomfortable'], 
    emojis: ['🙁', '😵‍💫', '🥴', '😪', '😓'],
    // backgroundColor: ['#ec5a45', '#f3b126'],
    backgroundColor: ['#8ba4ee', '#8ba4ee'] ,
    primaryImages: [
      './images/moods/nook.png'
    ]
  },
  { 
    zone: 'red',
    overall: 'bad',
    subCategories: ['upset', 'frustrated', 'furious', 'mad', 'angry'], 
    emojis: ['😤', '😡', '🤬', '👿', '😠'],
    // backgroundColor: ['#933939', '#ff4336'],
    backgroundColor: ['#fe843d', '#fe843d'] ,
    primaryImages: [
      './images/moods/angry.png'
    ]
  }
];

export { emotions };