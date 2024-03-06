class Workout {
    constructor(name, description, difficulty, category, type, steps, correct, wrong, videos) {
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
        this.category = category;
        this.type = type;
        this.steps = steps.map((step, index) => ({
            description: step,
            image: `/assets/icons/number-${index + 1}.png`
        })); 
        this.correct = correct.map(action => ({
            description: action,
            image: `/assets/icons/correct.png`
        }));
        this.wrong = wrong.map(action => ({
            description: action,
            image: `/assets/icons/wrong.png`
        }));
        this.videos = videos;
    }
}
  
const workouts = [
    new Workout(
        `Squats`,
        `A lower-body workout that strengthens the thighs, hips, buttocks, quads, and hamstrings, by bending the knees and lowering the hips.`,
        `Beginner`,
        `Quadriceps`,
        `incremental`,
        [
            `Stand with your feet slightly wider than hip-width apart, toes pointing slightly outward.`,
            `Keep your chest up and your spine in a neutral position, and engage your core muscles.`,
            `Bend at the hips and knees to lower down as if sitting back into a chair, keeping the weight on your heels.`,
            `Lower down until your thighs are at least parallel to the floor, ensuring your knees do not go past your toes.`,
            `Drive through your heels to return to the starting position, straightening your hips and knees.`
        ],
        [
            `Heel Position: Your heels remain flat on the floor throughout the squat, ensuring stability and proper leg muscle engagement.`, 
            `Knee Alignment: Your knees track in line with your toes, not caving inward or extending past your toes at the bottom of the squat.`, 
            `Hip Depth: You lower your hips until they are at least parallel to the knees, achieving a full range of motion for maximum effectiveness.`
        ],
        [
            `Heel Lift: If your heels come off the ground, it indicates a lack of balance and potential mobility issues in the ankles or hips.`, 
            `Knee Position: Knees that cave inward or jut too far over the toes can place undue stress on the joints and indicate weak glutes or tight hip flexors.`, 
            `Torso Lean: Excessive forward lean of the torso suggests weak core engagement, poor balance, or tightness in the lower back and hamstrings.`
        ],
        { 
            front: `/assets/videos/male-Bodyweight-bodyweight-squat-front.mp4`, 
            side: `/assets/videos/male-Bodyweight-bodyweight-squat-side.mp4` 
        }
    ),

    new Workout(
        `Jumping Jacks`,
        `A full-body exercise that increases aerobic fitness, strengthens the body, and promotes relaxation of the mind.`,
        `Beginner`,
        `Calves`,
        `incremental`,
        [
            `Stand upright with your legs together and arms at your sides.`, 
            `Bend your knees slightly, and jump into the air.`, 
            `As you jump, spread your legs to be about shoulder-width apart and stretch your arms out and over your head.`, 
            `Jump back to the starting position.`, 
            `Repeat the movement in a rhythmic fashion for a set number of repetitions or time.`
        ],
        [
            `Arm and Leg Coordination: Your arms and legs should move simultaneously and return to the starting position together.`, 
            `Soft Landings: Ensure you land with your knees slightly bent to absorb the impact and protect your joints.`, 
            `Full Range of Motion: Extend your arms and legs fully during the jump for maximum benefit.`
        ],
        [
            `Incomplete Movements: Not fully extending arms and legs reduces the effectiveness of the exercise.`, 
            `Hard Landings: Landing with straight legs can cause joint discomfort and increase injury risk.`, 
            `Asynchronous Movements: Arms and legs moving out of sync can disrupt balance and reduce workout efficiency.`
        ],
        { 
            front: `/assets/videos/male-Cardio-cardio-jumping-jacks-front.mp4`, 
            side: `/assets/videos/male-Cardio-cardio-jumping-jacks-side.mp4` 
        }
    ),
    
    new Workout(
        `Mountain Climbers`,
        `A dynamic, compound exercise that simulates the motion of climbing a mountain, targeting the core and cardiovascular endurance.`,
        `Intermediate`,
        `Core`,
        `incremental`,
        [
            `Start in a high plank position with hands under shoulders and body in a straight line from head to heels.`,
            `Engage your core and bring one knee towards your chest without lifting your hips.`,
            `Quickly switch legs, extending the bent knee back to plank position while bringing the other knee forward.`,
            `Maintain a neutral spine and avoid sagging or piking your hips throughout the movement.`,
            `Continue alternating knees with a controlled pace for the desired duration or repetitions.`
        ],
        [
            `Your body remains in a straight line with no arching or sagging of the lower back.`,
            `Shoulders are stacked directly above wrists, and core muscles are engaged.`,
            `Movement is smooth and controlled, with knees driving towards the chest without bouncing.`
        ],
        [
            `Hips are piking up or sagging down, disrupting the straight line of the body.`,
            `Shoulders drift away from being over the wrists, causing strain on the arms.`,
            `Movements are jerky or too fast, leading to loss of control and reduced core engagement.`
        ],
        { 
            front: `/assets/videos/male-bodyweight-mountain-climber-front.mp4`, 
            side: `/assets/videos/male-bodyweight-mountain-climber-side.mp4` 
        }
    ),

    new Workout(
        `Mountain Climbers`,
        `A dynamic, compound exercise that simulates the motion of climbing a mountain, targeting the core and cardiovascular endurance.`,
        `Intermediate`,
        `Core`,
        `incremental`,
        [
            `Start in a high plank position with hands under shoulders and body in a straight line from head to heels.`,
            `Engage your core and bring one knee towards your chest without lifting your hips.`,
            `Quickly switch legs, extending the bent knee back to plank position while bringing the other knee forward.`,
            `Maintain a neutral spine and avoid sagging or piking your hips throughout the movement.`,
            `Continue alternating knees with a controlled pace for the desired duration or repetitions.`
        ],
        [
            `Your body remains in a straight line with no arching or sagging of the lower back.`,
            `Shoulders are stacked directly above wrists, and core muscles are engaged.`,
            `Movement is smooth and controlled, with knees driving towards the chest without bouncing.`
        ],
        [
            `Hips are piking up or sagging down, disrupting the straight line of the body.`,
            `Shoulders drift away from being over the wrists, causing strain on the arms.`,
            `Movements are jerky or too fast, leading to loss of control and reduced core engagement.`
        ],
        { 
            front: `/assets/videos/male-bodyweight-mountain-climber-front.mp4`, 
            side: `/assets/videos/male-bodyweight-mountain-climber-side.mp4` 
        }
    ),

    new Workout(
        `Planks`,
        `A core-strengthening exercise that involves maintaining a position similar to a push-up for the maximum possible time.`,
        `Intermediate`,
        `Core`,
        `timed`,
        [
            `Start in a push-up position, with your forearms on the ground and elbows aligned below the shoulders.`,
            `Keep your body in a straight line from head to heels.`,
            `Engage your core by sucking your belly button into your spine.`,
            `Hold this position without letting your hips sag or lift.`,
            `Breathe steadily throughout.`
        ],
        [
            `Body Alignment: Your body should form a straight line from shoulders to ankles, with no sagging or piking.`,
            `Elbow Position: Elbows should be directly under your shoulders to ensure proper weight distribution and alignment.`,
            `Core Engagement: You should feel your core muscles engaged and working to maintain the plank position.`
        ],
        [
            `Hips Too High or Low: If your hips are too high or too low, it can compromise the effectiveness of the plank and put strain on your back.`,
            `Collapsing Shoulders: Shoulders that collapse inward indicate a lack of strength and stability in the shoulder girdle.`,
            `Holding Breath: Forgetting to breathe steadily throughout the exercise can cause unnecessary tension and reduce stamina.`
        ],
        { 
            front: `/assets/videos/male-bodyweight-forearm-plank-front.mp4`, 
            side: `/assets/videos/male-bodyweight-forearm-plank-side.mp4` 
        }
    ),

    new Workout(
        `Planks (Straight-Arm)`,
        `A core exercise that strengthens the entire abdominal region and improves posture and stability.`,
        `Intermediate`,
        `Core`,
        `timed`,
        [
            `Begin in a push-up position with arms fully extended and hands under shoulders.`,
            `Keep feet together with toes on the floor and body in a straight line.`,
            `Engage core and glutes, maintaining a neutral spine and neck.`,
            `Hold the position, breathing normally for the set duration.`,
            `Avoid sagging or piking; keep the body rigid like a plank.`
        ],
        [
            `Ensure body alignment is straight from head to heels.`,
            `Position arms correctly with hands under the shoulders.`,
            `Engage the core throughout to support the lower back.`
        ],
        [
            `Do not let hips rise or drop, which can compromise form.`,
            `Avoid locking out elbows too tightly to prevent strain.`,
            `Keep breathing steady; do not hold your breath.`
        ],
        { 
            front: `/assets/videos/male-bodyweight-hand-plank-front_ZnMlFBF.mp4`, 
            side: `/assets/videos/male-bodyweight-hand-plank-side_GnZ2NZh.mp4` 
        }
    ),

    new Workout(
        `Side Planks`,
        `A unilateral core exercise that emphasizes the obliques and promotes shoulder and hip stability.`,
        `Intermediate`,
        `Obliques`,
        `timed`,
        [
            `Lie on your side with your legs extended and feet stacked.`,
            `Prop your body up on your forearm, ensuring your elbow is directly under your shoulder.`,
            `Lift your hips off the ground, forming a straight line from head to feet.`,
            `Hold the position, keeping your core tight and hips elevated.`,
            `Breathe steadily and maintain the pose for the desired duration.`
        ],
        [
            `Body Alignment: Your body should form a straight line with no sagging or lifting at the hips.`,
            `Shoulder Stability: Keep your supporting shoulder away from your ear to maintain proper form.`,
            `Controlled Breathing: Breathe evenly to help maintain balance and focus during the exercise.`
        ],
        [
            `Hip Sagging: Allowing your hips to drop can reduce the effectiveness of the exercise and strain your lower back.`,
            `Twisted Torso: Keep your shoulders and hips squared to avoid twisting, which can lead to improper form and potential injury.`,
            `Strained Neck: Avoid looking up or down; keep your neck in a neutral position aligned with your spine.`
        ],
        { 
            front: `/assets/videos/male-bodyweight-elbow-side-plank-front.mp4`, 
            side: `/assets/videos/male-bodyweight-elbow-side-plank-side.mp4` 
        }
    ),

    new Workout(
        `Side Planks (Straight-Arm)`,
        `A core strengthening exercise that targets the obliques and improves balance and stability with an extended arm.`,
        `Intermediate`,
        `Obliques`,
        `timed`,
        [
            `Lie on your side with your legs extended and feet stacked.`,
            `Place your hand directly under your shoulder and push up, extending your arm fully.`,
            `Raise your hips off the ground to form a straight line from head to ankles.`,
            `Extend your free arm towards the ceiling or place it on your hip.`,
            `Hold the position, keeping your core engaged and body straight.`
        ],
        [
            `Arm Position: Ensure your supporting arm is straight and strong, with the hand placed firmly on the ground.`,
            `Body Alignment: Keep your body in a straight line without sagging hips or a piked waist.`,
            `Controlled Breathing: Maintain steady breathing to help hold the position and focus.`
        ],
        [
            `Locked Elbow: Avoid locking the elbow of your supporting arm to prevent strain.`,
            `Hip Dropping: Do not let your hips sag as this can compromise the effectiveness and cause back strain.`,
            `Head Position: Keep your head in a neutral position, aligned with your spine, and avoid tilting it up or down.`
        ],
        { 
            front: `/assets/videos/male-bodyweight-hand-side-plank-front.mp4`, 
            side: `/assets/videos/male-bodyweight-hand-side-plank-side.mp4` 
        }
    ),

    new Workout(
        `Burpees`,
        `A high-intensity full-body workout that combines a squat, push-up, and jump for cardiovascular and strength training.`,
        `Advanced`,
        `Quadriceps`,
        `incremental`,
        [
            `Start standing with your feet shoulder-width apart and your arms by your sides.`,
            `Squat down and place your hands on the floor in front of you, just inside your feet.`,
            `Jump your feet back to land in a plank position, keeping your body straight from head to heels.`,
            `Do a push-up, bending your elbows and lowering your chest to the floor, then pushing back up.`,
            `Jump your feet back towards your hands, then explosively jump into the air, reaching your arms overhead.`
        ],
        [
            `Plank Position: In the plank phase of the burpee, your body should form a straight line from head to heels, without sagging or piking at the hips.`,
            `Full Push-Up: A proper burpee includes a full push-up, meaning your chest should touch the floor before pushing back up.`,
            `Fluid Movement: Transitions between the squat, plank, and jump should be smooth and controlled, maintaining a consistent rhythm.`
        ],
        [
            `Sagging Hips: During the plank or push-up, if your hips sag, it can strain your lower back and indicates a lack of core engagement.`,
            `Incomplete Push-Up: Skipping the push-up phase or not lowering all the way down reduces the effectiveness of the exercise.`,
            `Landing Hard: If you land hard on your feet after the jump, it suggests a lack of control and can lead to joint impact injuries.`
        ],
        {
            front: `/assets/videos/male-bodyweight-burpee-front.mp4`,
            side: `/assets/videos/male-bodyweight-burpee-side.mp4`,
        }
    ),

    new Workout(
        `Chin Ups`,
        `An upper-body exercise that strengthens the biceps, forearms, and back muscles by pulling up with palms facing towards the body.`,
        `Advanced`,
        `Biceps`,
        `incremental`,
        [
            `Grip the bar with palms facing you, hands shoulder-width apart.`,
            `Start from a dead hang with arms fully extended.`,
            `Pull your body up until your chin clears the bar.`,
            `Hold for a moment at the top with your chin over the bar.`,
            `Lower yourself back down to a full hang in a controlled manner.`
        ],
        [
            `Keep your core engaged to prevent swinging.`,
            `Ensure elbows are drawn in towards your torso as you pull up.`,
            `Breathe out as you pull up and in as you lower down.`
        ],
        [
            `Avoid jerking or using momentum to pull yourself up.`,
            `Do not cross your legs or kick as it can lead to improper form.`,
            `Refrain from dropping down quickly; lower yourself with control.`
        ],
        {
            front: `/assets/videos/male-bodyweight-chinup-front.mp4`,
            side: `/assets/videos/male-bodyweight-chinup-side.mp4`,
        }
    ),

    new Workout(
        `Pull Ups`,
        `A challenging upper-body workout that targets the upper back, shoulders, and arms by pulling up with palms facing away from the body.`,
        `Advanced`,
        `Upper Back`,
        `incremental`,
        [
            `Grip the bar with palms facing away, wider than shoulder-width apart.`,
            `Hang with straight arms and legs off the ground.`,
            `Pull yourself up until your chest is close to the bar.`,
            `Pause briefly with your chest near the bar.`,
            `Lower back to the starting position in a controlled motion.`
        ],
        [
            `Engage your back muscles to initiate the pull.`,
            `Keep your body straight and avoid swinging throughout the exercise.`,
            `Exhale as you pull up and inhale on the way down.`
        ],
        [
            `Do not use momentum to swing up; the movement should be strict.`,
            `Avoid incomplete movements; strive for full range of motion.`,
            `Ensure not to arch your back excessively during the exercise.`
        ],
        {
            front: `/assets/videos/male-bodyweight-pullup-front.mp4`,
            side: `/assets/videos/male-bodyweight-pullup-side.mp4`,
        },
    ),

];
  
export { workouts };