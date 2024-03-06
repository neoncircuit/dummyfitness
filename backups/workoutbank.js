// Example workout data
const workouts = [
    {
      name: `Squats`,
      description: `A lower-body workout that strengthens the thighs, hips, buttocks, quads, and hamstrings, by bending the knees and lowering the hips.`,
      difficulty: `Beginner`,
      category: `Quadriceps`,
      type: `incremental`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Stand with your feet slightly wider than hip-width apart, toes pointing slightly outward.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Keep your chest up and your spine in a neutral position, and engage your core muscles.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> Bend at the hips and knees to lower down as if sitting back into a chair, keeping the weight on your heels.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Lower down until your thighs are at least parallel to the floor, ensuring your knees do not go past your toes.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Drive through your heels to return to the starting position, straightening your hips and knees.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Heel Position: Your heels remain flat on the floor throughout the squat, ensuring stability and proper leg muscle engagement.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Knee Alignment: Your knees track in line with your toes, not caving inward or extending past your toes at the bottom of the squat.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Hip Depth: You lower your hips until they are at least parallel to the knees, achieving a full range of motion for maximum effectiveness.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Heel Lift: If your heels come off the ground, it indicates a lack of balance and potential mobility issues in the ankles or hips.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Knee Position: Knees that cave inward or jut too far over the toes can place undue stress on the joints and indicate weak glutes or tight hip flexors.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Torso Lean: Excessive forward lean of the torso suggests weak core engagement, poor balance, or tightness in the lower back and hamstrings.`,
      ],
      videos: {
        front: `/assets/videos/male-Bodyweight-bodyweight-squat-front.mp4`,
        side: `/assets/videos/male-Bodyweight-bodyweight-squat-side.mp4`,
      },
    },
    
    {
      name: `Jumping Jacks`,
      description: `A full-body exercise that increases aerobic fitness, strengthens the body, and promotes relaxation of the mind.`,
      difficulty: `Beginner`,
      category: `Calves`,
      type: `incremental`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Stand upright with your legs together and arms at your sides.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Bend your knees slightly, and jump into the air.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> As you jump, spread your legs to be about shoulder-width apart and stretch your arms out and over your head.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Jump back to the starting position.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Repeat the movement in a rhythmic fashion for a set number of repetitions or time.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Arm and Leg Coordination: Your arms and legs should move simultaneously and return to the starting position together.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Soft Landings: Ensure you land with your knees slightly bent to absorb the impact and protect your joints.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Full Range of Motion: Extend your arms and legs fully during the jump for maximum benefit.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Incomplete Movements: Not fully extending arms and legs reduces the effectiveness of the exercise.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Hard Landings: Landing with straight legs can cause joint discomfort and increase injury risk.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Asynchronous Movements: Arms and legs moving out of sync can disrupt balance and reduce workout efficiency.`,
      ],
      videos: {
        front: `/assets/videos/male-Cardio-cardio-jumping-jacks-front.mp4`,
        side: `/assets/videos/male-Cardio-cardio-jumping-jacks-side.mp4`,
      },
    },

    {
      name: `Mountain Climbers`,
      description: `A dynamic, compound exercise that simulates the motion of climbing a mountain, targeting the core and cardiovascular endurance.`,
      difficulty: `Intermediate`,
      category: `Core`,
      type: `incremental`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Start in a high plank position with hands under shoulders and body in a straight line from head to heels.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Engage your core and bring one knee towards your chest without lifting your hips.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> Quickly switch legs, extending the bent knee back to plank position while bringing the other knee forward.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Maintain a neutral spine and avoid sagging or piking your hips throughout the movement.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Continue alternating knees with a controlled pace for the desired duration or repetitions.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Your body remains in a straight line with no arching or sagging of the lower back.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Shoulders are stacked directly above wrists, and core muscles are engaged.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Movement is smooth and controlled, with knees driving towards the chest without bouncing.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Hips are piking up or sagging down, disrupting the straight line of the body.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Shoulders drift away from being over the wrists, causing strain on the arms.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Movements are jerky or too fast, leading to loss of control and reduced core engagement.`,
      ],      
      videos: {
        front: `/assets/videos/male-bodyweight-mountain-climber-front.mp4`,
        side: `/assets/videos/male-bodyweight-mountain-climber-side.mp4`,
      },
    },

    {
      name: `Push Ups`,
      description: `A full-body exercise targeting the chest, shoulders, and triceps by lowering and lifting the body using the arms.`,
      difficulty: `Intermediate`,
      category: `Chest`,
      type: `incremental`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Position your hands slightly wider than shoulder-width apart, with fingers pointing forward and palms flat on the ground.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Extend your legs back so that you are balanced on your hands and toes. Keep your body in a straight line from head to heels without sagging or arching your back.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> Engage your core by tightening your abdominal muscles to keep your body rigid throughout the movement.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Lower your body by bending your elbows until your chest nearly touches the floor. Keep your elbows close to your body rather than flaring them out to the sides.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Push back up to the starting position by extending your arms, while maintaining a straight body line.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Body Alignment: Your body should form a straight line from your head to your heels, with no sagging or piking at the hips.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Elbow Position: As you lower down, your elbows should be at a 45-degree angle to your body, not flared out wide.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Depth of Movement: You should lower your body until your chest is just above the ground, ensuring a full range of motion.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Sagging Hips: If your hips are sagging, it puts unnecessary strain on your lower back and disengages your core.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Flared Elbows: Elbows flaring out to the sides can cause shoulder strain and reduce the effectiveness of the exercise on your chest and triceps.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Incomplete Range of Motion: Stopping short of the full movement, either not going low enough or not pushing up fully, reducing effectiveness and leading to muscle imbalances.`,
      ],      
      videos: {
        front: `/assets/videos/male-Bodyweight-push-up-front.mp4`,
        side: `/assets/videos/male-Bodyweight-push-up-side.mp4`,
      },
    },

    {
      name: `Planks`,
      description: `A core-strengthening exercise that involves maintaining a position similar to a push-up for the maximum possible time.`,
      difficulty: `Intermediate`,
      category: `Core`,
      type: `timed`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Start in a push-up position, with your forearms on the ground and elbows aligned below the shoulders.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Keep your body in a straight line from head to heels.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> Engage your core by sucking your belly button into your spine.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Hold this position without letting your hips sag or lift.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Breathe steadily throughout.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Body Alignment: Your body should form a straight line from shoulders to ankles, with no sagging or piking.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Elbow Position: Elbows should be directly under your shoulders to ensure proper weight distribution and alignment.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Core Engagement: You should feel your core muscles engaged and working to maintain the plank position.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Hips Too High or Low: If your hips are too high or too low, it can compromise the effectiveness of the plank and put strain on your back.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Collapsing Shoulders: Shoulders that collapse inward indicate a lack of strength and stability in the shoulder girdle.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Holding Breath: Forgetting to breathe steadily throughout the exercise can cause unnecessary tension and reduce stamina.`,
      ],      
      videos: {
        front: `/assets/videos/male-bodyweight-forearm-plank-front.mp4`,
        side: `/assets/videos/male-bodyweight-forearm-plank-side.mp4`,
      },
    },

    {
      name: `Planks (Straight-Arm)`,
      description: `A core exercise that strengthens the entire abdominal region and improves posture and stability.`,
      difficulty: `Intermediate`,
      category: `Core`,
      type: `timed`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Begin in a push-up position with arms fully extended and hands under shoulders.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Keep feet together with toes on the floor and body in a straight line.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> Engage core and glutes, maintaining a neutral spine and neck.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Hold the position, breathing normally for the set duration.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Avoid sagging or piking; keep the body rigid like a plank.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Ensure body alignment is straight from head to heels.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Position arms correctly with hands under the shoulders.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Engage the core throughout to support the lower back.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Do not let hips rise or drop, which can compromise form.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Avoid locking out elbows too tightly to prevent strain.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Keep breathing steady; do not hold your breath.`,
      ],
      videos: {
        front: `/assets/videos/male-bodyweight-hand-plank-front_ZnMlFBF.mp4`,
        side: `/assets/videos/male-bodyweight-hand-plank-side_GnZ2NZh.mp4`,
      },
    },

    {
      name: `Side Planks`,
      description: `A unilateral core exercise that emphasizes the obliques and promotes shoulder and hip stability.`,
      difficulty: `Intermediate`,
      category: `Obliques`,
      type: `timed`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Lie on your side with your legs extended and feet stacked.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Prop your body up on your forearm, ensuring your elbow is directly under your shoulder.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> Lift your hips off the ground, forming a straight line from head to feet.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Hold the position, keeping your core tight and hips elevated.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Breathe steadily and maintain the pose for the desired duration.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Body Alignment: Your body should form a straight line with no sagging or lifting at the hips.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Shoulder Stability: Keep your supporting shoulder away from your ear to maintain proper form.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Controlled Breathing: Breathe evenly to help maintain balance and focus during the exercise.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Hip Sagging: Allowing your hips to drop can reduce the effectiveness of the exercise and strain your lower back.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Twisted Torso: Keep your shoulders and hips squared to avoid twisting, which can lead to improper form and potential injury.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Strained Neck: Avoid looking up or down; keep your neck in a neutral position aligned with your spine.`,
      ],
      videos: {
        front: `/assets/videos/male-bodyweight-elbow-side-plank-front.mp4`,
        side: `/assets/videos/male-bodyweight-elbow-side-plank-side.mp4`,
      },
    },

    {
      name: `Side Planks (Straight-Arm)`,
      description: `A core strengthening exercise that targets the obliques and improves balance and stability with an extended arm.`,
      difficulty: `Intermediate`,
      category: `Obliques`,
      type: `timed`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Lie on your side with your legs extended and feet stacked.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Place your hand directly under your shoulder and push up, extending your arm fully.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> Raise your hips off the ground to form a straight line from head to ankles.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Extend your free arm towards the ceiling or place it on your hip.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Hold the position, keeping your core engaged and body straight.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Arm Position: Ensure your supporting arm is straight and strong, with the hand placed firmly on the ground.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Body Alignment: Keep your body in a straight line without sagging hips or a piked waist.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Controlled Breathing: Maintain steady breathing to help hold the position and focus.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Locked Elbow: Avoid locking the elbow of your supporting arm to prevent strain.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Hip Dropping: Do not let your hips sag as this can compromise the effectiveness and cause back strain.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Head Position: Keep your head in a neutral position, aligned with your spine, and avoid tilting it up or down.`,
      ],
      videos: {
        front: `/assets/videos/male-bodyweight-hand-side-plank-front.mp4`,
        side: `/assets/videos/male-bodyweight-hand-side-plank-side.mp4`,
      },
    },   

    {
      name: `Burpees`,
      description: `A high-intensity full-body workout that combines a squat, push-up, and jump for cardiovascular and strength training.`,
      difficulty: `Advanced`,
      category: `Quadriceps`,
      type: `incremental`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Start standing with your feet shoulder-width apart and your arms by your sides.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Squat down and place your hands on the floor in front of you, just inside your feet.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> Jump your feet back to land in a plank position, keeping your body straight from head to heels.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Do a push-up, bending your elbows and lowering your chest to the floor, then pushing back up.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Jump your feet back towards your hands, then explosively jump into the air, reaching your arms overhead.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Plank Position: In the plank phase of the burpee, your body should form a straight line from head to heels, without sagging or piking at the hips.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Full Push-Up: A proper burpee includes a full push-up, meaning your chest should touch the floor before pushing back up.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Fluid Movement: Transitions between the squat, plank, and jump should be smooth and controlled, maintaining a consistent rhythm.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Sagging Hips: During the plank or push-up, if your hips sag, it can strain your lower back and indicates a lack of core engagement.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Incomplete Push-Up: Skipping the push-up phase or not lowering all the way down reduces the effectiveness of the exercise.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Landing Hard: If you land hard on your feet after the jump, it suggests a lack of control and can lead to joint impact injuries.`,
      ],
      videos: {
        front: `/assets/videos/male-bodyweight-burpee-front.mp4`,
        side: `/assets/videos/male-bodyweight-burpee-side.mp4`,
      },
    },

    {
      name: `Chin Ups`,
      description: `An upper-body exercise that strengthens the biceps, forearms, and back muscles by pulling up with palms facing towards the body.`,
      difficulty: `Advanced`,
      category: `Biceps`,
      type: `incremental`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Grip the bar with palms facing you, hands shoulder-width apart.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Start from a dead hang with arms fully extended.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> Pull your body up until your chin clears the bar.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Hold for a moment at the top with your chin over the bar.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Lower yourself back down to a full hang in a controlled manner.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Keep your core engaged to prevent swinging.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Ensure elbows are drawn in towards your torso as you pull up.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Breathe out as you pull up and in as you lower down.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Avoid jerking or using momentum to pull yourself up.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Do not cross your legs or kick as it can lead to improper form.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Refrain from dropping down quickly; lower yourself with control.`,
      ],
      videos: {
        front: `/assets/videos/male-bodyweight-chinup-front.mp4`,
        side: `/assets/videos/male-bodyweight-chinup-side.mp4`,
      },
    },

    {
      name: `Pull Ups`,
      description: `A challenging upper-body workout that targets the upper back, shoulders, and arms by pulling up with palms facing away from the body.`,
      difficulty: `Advanced`,
      category: `Upper Back`,
      type: `incremental`,
      steps: [
        `<img src="/assets/icons/number-1.png" alt="Number One"> Grip the bar with palms facing away, wider than shoulder-width apart.`,
        `<img src="/assets/icons/number-2.png" alt="Number Two"> Hang with straight arms and legs off the ground.`,
        `<img src="/assets/icons/number-3.png" alt="Number Three"> Pull yourself up until your chest is close to the bar.`,
        `<img src="/assets/icons/number-4.png" alt="Number Four"> Pause briefly with your chest near the bar.`,
        `<img src="/assets/icons/number-5.png" alt="Number Five"> Lower back to the starting position in a controlled motion.`,
      ],
      correct: [
        `<img src="/assets/icons/correct.png" alt="Correct"> Engage your back muscles to initiate the pull.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Keep your body straight and avoid swinging throughout the exercise.`,
        `<img src="/assets/icons/correct.png" alt="Correct"> Exhale as you pull up and inhale on the way down.`,
      ],
      wrong: [
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Do not use momentum to swing up; the movement should be strict.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Avoid incomplete movements; strive for full range of motion.`,
        `<img src="/assets/icons/wrong.png" alt="Wrong"> Ensure not to arch your back excessively during the exercise.`,
      ],
      videos: {
        front: `/assets/videos/male-bodyweight-pullup-front.mp4`,
        side: `/assets/videos/male-bodyweight-pullup-side.mp4`,
      },
    },
    // Add more workout objects as needed
  ];
  
  export { workouts };
  //module.exports = { workouts };