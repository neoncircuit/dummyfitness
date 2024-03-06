class Workout {
    constructor(name, description, difficulty, category, type, steps, correct, wrong, videos, tip) {
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
        this.tip = tip.map(action => ({
            description: action,
            image: `/assets/icons/tip.png`
        }));
    }
}
  
const workouts = [
    new Workout(
        `Squats`,
        `A lower-body workout that strengthens the thighs, hips, buttocks, quads, and hamstrings, by bending the knees and lowering the hips.`,
        `Beginner`,
        [
            `Quadriceps`,
            `Glutes`,
            `Hamstrings`
        ],
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
        },
        [
            `If you are finding it hard to jump and spread your feet and arms at the same time, you can try to modify the exercise by stepping out one foot at a time instead of jumping.<br>
            You can also reduce the range of motion of your arms and legs, or do the exercise at a slower pace.`
        ]       
    ),

    new Workout(
        `Jumping Jacks`,
        `A full-body exercise that increases aerobic fitness, strengthens the body, and promotes relaxation of the mind.`,
        `Beginner`,
        [
            `Calves`,
            `Hip Abductors`,
            `Shoulders`
        ],     
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
        },
        [
            `If you are finding it hard to jump and spread your feet and arms at the same time, you can try to modify the exercise by stepping out one foot at a time instead of jumping.<br>
            You can also reduce the range of motion of your arms and legs, or do the exercise at a slower pace.<br>
            You can also use a low-impact version by keeping one foot on the floor at all times.`
        ]
    ),

    new Workout(
        `Curls (Barbell)`,
        `An isolation exercise that targets the biceps, promoting strength and hypertrophy in the upper arms.`,
        `Beginner`,
        [
            `Biceps`
        ],
        `incremental`,
        [
            `Stand with feet shoulder-width apart, holding a barbell with an underhand grip.`,
            `Keep your elbows close to your sides and your upper arms stationary.`,
            `Curl the barbell up towards your shoulders, contracting your biceps.`,
            `Pause at the top of the movement, then lower the barbell back down with control.`
        ],
        [
            `Elbow Position: Elbows remain close to the torso throughout the exercise, ensuring isolation of the biceps.`,
            `Controlled Movement: Smooth, controlled movement without swinging the barbell or using momentum.`,
            `Full Contraction: Achieving a full contraction of the biceps at the top of the curl.`
        ],
        [
            `Using Momentum: Swinging the barbell by rocking the body or moving the elbows forward.`,
            `Incomplete Range: Not fully extending the arms at the bottom or not fully contracting the biceps at the top.`,
            `Elbow Movement: Allowing the elbows to move away from the body, reducing the effectiveness of the bicep curl.`
        ],
        {
            front: `/assets/videos/male-Barbell-barbell-curl-front.mp4`,
            side: `/assets/videos/male-Barbell-barbell-curl-side.mp4`
        },
        [
            `If you are unable to curl the barbell all the way up to your chest, you can try to lower the weight or use dumbbells instead.<br>
            This will allow you to adjust the resistance and the range of motion according to your ability.<br>
            You can also use a spotter to help you lift the weight past the sticking point, or use a cable machine or a resistance band to provide constant tension on your biceps.`
        ]
    ),

    new Workout(
        `Curls (Dumbbell)`,
        `An isolation exercise that targets the biceps through the curling motion of dumbbells towards the shoulders.`,
        `Beginner`,
        [
            `Biceps`
        ],
        `incremental`,
        [
            `Stand with feet shoulder-width apart, holding a dumbbell in each hand at arm's length.`,
            `Keep your elbows close to your torso and rotate the palms of your hands until they are facing forward.`,
            `While keeping the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out.`,
            `Continue the movement until your biceps are fully contracted and the dumbbells are at shoulder level.`,
            `Hold the contracted position for a brief pause as you squeeze your biceps and slowly begin to bring the dumbbells back to the starting position as your breathe in.`
        ],
        [
            `Stable Elbows: Elbows remain pinned at your sides, moving only your forearms.`,
            `Full Contraction: Biceps are fully contracted at the top with a clear squeeze.`,
            `Controlled Tempo: Lifting and lowering the dumbbells with controlled, steady movements.`
        ],
        [
            `Swinging: Using momentum to swing the dumbbells up, indicating weight might be too heavy.`,
            `Elbow Movement: Allowing elbows to move forward or away from the body reduces biceps engagement.`,
            `Incomplete Range: Not fully extending arms at the bottom or not fully contracting at the top.`
        ],
        {
            front: `/assets/videos/male-Dumbbells-dumbbell-curl-front.mp4`,
            side: `/assets/videos/male-Dumbbells-dumbbell-curl-side.mp4`
        },
        [
            `If you are unable to curl the dumbbells all the way up to your shoulders, you can try to lower the weight or use a barbell instead.<br> 
            This will allow you to adjust the resistance and the range of motion according to your ability.<br>
            You can also use a spotter to help you lift the weight past the sticking point, or use a cable machine or a resistance band to provide constant tension on your biceps.`
        ] 
    ),

    new Workout(
        `Squats (Barbell)`,
        `A compound lower-body exercise that strengthens the entire lower body and core. It involves performing a squat while holding a barbell across the shoulders.`,
        `Intermediate`,
        [
            `Quadriceps`,
            `Hamstrings`,
            `Glutes`
        ],
        `incremental`,
        [
            `Stand with your feet shoulder-width apart, with a barbell positioned on your upper back.`,
            `Descend by bending your knees and sitting back with your hips, keeping the weight on your heels.`,
            `Lower yourself until your thighs are parallel to the floor, ensuring your knees stay aligned with your toes.`,
            `Press through your heels to return to the starting position, extending your hips and knees.`,
            `Keep your head up and back straight throughout the movement, focusing on depth and form.`
        ],
        [
            `Depth: Lowering the hips until they are at least parallel with the knees.`,
            `Back Position: Maintaining a straight back with natural spinal curvature throughout the squat.`,
            `Knee Alignment: Ensuring knees are tracking over toes and not caving inwards.`
        ],
        [
            `Inadequate Depth: Failing to lower to at least parallel, limiting the effectiveness of the squat.`,
            `Compromised Posture: Allowing the back to round or arch excessively, risking injury.`,
            `Heel Lift: Heels lifting off the ground, indicating poor form or lack of mobility.`
        ],
        {
            front: `/assets/videos/male-Barbell-barbell-squat-front.mp4`,
            side: `/assets/videos/male-Barbell-barbell-squat-side.mp4`
        },
        [
            `If you are finding it hard to squat down to parallel or below, you can try to improve your mobility and flexibility by doing some dynamic stretches and warm-up sets before your main workout.<br> 
            You can also use a box or a bench to squat to, or place a small plate under your heels to improve your balance and depth.<br> 
            You can also use a wider stance or a lower bar position to reduce the stress on your lower back and knees.`
        ]
    ),

    new Workout(
        `Hip Thrusts (Barbell)`,
        `A lower-body exercise focusing on the glutes by elevating the hips towards the ceiling while a barbell rests on the lap.`,
        `Intermediate`,
        [
            `Glutes`
        ],
        `incremental`,
        [
            `Sit on the ground with a bench behind you, a loaded barbell over your legs. Roll the bar so it's directly above your hips.`,
            `Lean back against the bench so that your shoulder blades are near the top of it.`,
            `Drive through your feet, extending your hips vertically. Keep your chin tucked to your chest.`,
            `At the top of the movement, squeeze your glutes hard and ensure your body forms a straight line from your shoulders to your knees.`,
            `Lower the hips back down to the starting position in a controlled manner.`
        ],
        [
            `Full Hip Extension: Achieving full extension at the top, with hips fully elevated and glutes contracted.`,
            `Stable Upper Body: Shoulders and upper back remain in contact with the bench, providing stability.`,
            `Neutral Spine: Maintaining a neutral spine throughout the movement, avoiding excessive arching.`
        ],
        [
            `Limited Range: Failing to fully extend the hips at the top of the movement.`,
            `Overarching: Excessively arching the lower back, which can lead to strain.`,
            `Shifting Weight: Allowing the weight to shift onto the neck or away from the hips, which can reduce effectiveness and increase injury risk.`
        ],
        {
            front: `/assets/videos/male-Barbell-barbell-deadlift-front.mp4`,
            side: `/assets/videos/male-Barbell-barbell-deadlift-side.mp4`
        },
        [
            `If you are having trouble lifting your hips off the floor or keeping them level, you can try to place a resistance band around your knees and push them out as you thrust.<br> 
            This will activate your glutes and prevent your knees from caving in.<br> 
            You can also use a lighter weight or a smaller range of motion, or do the exercise with one leg at a time.`
        ]
    ),
    
    new Workout(
        `Deadlifts (Barbell)`,
        `A compound exercise that targets the lower back, glutes, and hamstrings. It involves lifting a barbell off the ground to hip level, then lowering it back down.`,
        `Intermediate`,
        [
            `Glutes`,
            `Hamstrings`,
            `Lower Back`,
            `Trapezius`
        ],
        `incremental`,
        [
            `Stand with your feet hip-width apart with the barbell over your mid-foot.`,
            `Bend at the hips and knees, grabbing the bar with hands shoulder-width apart, outside your knees.`,
            `Lift your chest, straighten your back, and brace your core.`,
            `Drive through your heels to lift the bar, keeping it close to your body, until you're standing upright.`,
            `Hinge at the hips to lower the bar back to the ground in a controlled movement.`
        ],
        [
            `Bar Path: The barbell moves in a straight vertical line, close to the body.`,
            `Back Position: Maintaining a neutral spine without rounding or arching excessively.`,
            `Hip and Knee Extension: Hips and knees lock out simultaneously at the top of the lift.`
        ],
        [
            `Rounding Back: The back rounds forward during the lift, increasing the risk of injury.`,
            `Jerking Movement: Using a jerking motion to lift the weight instead of a smooth, controlled movement.`,
            `Bar Drift: The barbell moves away from the body, indicating a loss of control and inefficient lifting form.`
        ],
        { 
            front: `/assets/videos/male-bodyweight-mountain-climber-front.mp4`, 
            side: `/assets/videos/male-bodyweight-mountain-climber-side.mp4` 
        },
        [
            `If you are finding it hard to lift the barbell off the floor or keep your back straight, you can try to improve your mobility and flexibility by doing some dynamic stretches and warm-up sets before your main workout.<br> 
            You can also use a lower weight or a shorter range of motion, or do the exercise on blocks or a rack to reduce the distance you have to pull.<br> 
            You can also use a mixed grip or straps to improve your grip strength and prevent the bar from slipping.`
        ]
    ),

    new Workout(
        `Mountain Climbers`,
        `A dynamic, compound exercise that simulates the motion of climbing a mountain, targeting the core and cardiovascular endurance.`,
        `Intermediate`,
        [
            `Core`,
            `Quadriceps`,
            `Hip Flexors`
        ],       
        `timed`,
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
        },
        [
            `If you are finding it hard to move your legs fast or keep your hips low, you can try to slow down the pace or take shorter steps.<br> 
            You can also elevate your hands on a bench or a ball to reduce the difficulty.<br> 
            You can also do the exercise with your knees bent or your feet on sliders to make it easier.`
        ]
    ),

    new Workout(
        `Planks`,
        `A core-strengthening exercise that involves maintaining a position similar to a push-up for the maximum possible time.`,
        `Intermediate`,
        [
            `Core`
        ],
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
        },
        [
            `If you are having trouble holding a plank position, you can try to modify it by placing your knees on the floor, or by elevating your elbows on a bench or a ball.<br> 
            This will reduce the amount of weight on your core and make it easier to keep your body in a straight line.<br> 
            You can also focus on your breathing and tighten your abs and glutes to prevent your hips from sagging or lifting.`
        ]
    ),

    new Workout(
        `Planks (Straight-Arm)`,
        `A core exercise that strengthens the entire abdominal region and improves posture and stability.`,
        `Intermediate`,
        [
            `Core`,
            `Shoulders`
        ],
        `timed`,
        [
            `Begin in a push-up position with arms fully extended and hands under shoulders.`,
            `Keep feet together with toes on the floor and body in a straight line.`,
            `Engage core and glutes, maintaining a neutral spine and neck.`,
            `Hold the position, breathing normally for the set duration.`,
            `Avoid sagging or piking; keep the body rigid like a plank.`
        ],
        [
            `Body Alignment: Your body forms a straight line from head to heels, with no sagging or arching in the lower back.`,
            `Shoulder Position: Shoulders are directly above your wrists, not shifted forward or backward.`,
            `Core Engagement: Your abdominal muscles are visibly engaged, helping to stabilize your entire body.`
        ],
        [
            `Hip Sag: Lower back and hips sag toward the ground, indicating a lack of core engagement.`,
            `Hip Height: Hips are piked up too high, shifting the focus away from the core.`,
            `Arm Position: Arms are not vertical, placing unnecessary strain on the shoulders.`
        ],
        { 
            front: `/assets/videos/male-bodyweight-hand-plank-front_ZnMlFBF.mp4`, 
            side: `/assets/videos/male-bodyweight-hand-plank-side_GnZ2NZh.mp4` 
        },
        [
            `If you are unable to hold a straight arm plank position, you can try to modify it by placing your knees on the floor, or by widening your feet or hands.<br> 
            This will reduce the amount of weight on your core and make it easier to keep your body in a straight line.<br> 
            You can also focus on your breathing and tighten your abs and glutes to prevent your hips from sagging or lifting.`
        ]
    ),

    new Workout(
        `Side Planks`,
        `A unilateral core exercise that emphasizes the obliques and promotes shoulder and hip stability.`,
        `Intermediate`,
        [
            `Core`,
            `Obliques`
        ],
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
        },
        [
            `If you are having trouble holding a side plank position, you can try to modify it by placing your bottom knee on the floor, or by stacking your feet or placing them in a staggered stance.<br> 
            This will reduce the amount of weight on your core and make it easier to keep your hips lifted.<br> 
            You can also focus on your breathing and tighten your abs and obliques to prevent your hips from dropping or twisting12.`
        ]
    ),

    new Workout(
        `Side Planks (Straight-Arm)`,
        `A core strengthening exercise that targets the obliques and improves balance and stability with an extended arm.`,
        `Intermediate`,
        [
            `Core`,
            `Obliques`,
            `Shoulders`
        ],
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
        },
        [
            `If you are unable to hold a straight arm side plank position, you can try to modify it by placing your bottom knee on the floor, or by stacking your feet or placing them in a staggered stance.<br> 
            This will reduce the amount of weight on your core and make it easier to keep your hips lifted.<br> 
            You can also focus on your breathing and tighten your abs and obliques to prevent your hips from dropping or twisting.`
        ]
    ),

    new Workout(
        `Burpees`,
        `A high-intensity full-body workout that combines a squat, push-up, and jump for cardiovascular and strength training.`,
        `Advanced`,
        [
            `Quadriceps`,
            `Glutes`,
            `Shoulders`,
            `Hamstrings`,
            `Chest`,
            `Triceps`
        ],
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
        },
        [
            `If you are finding it hard to do a full burpee, you can try to modify the exercise by skipping the push-up or the jump, or by doing them separately.<br> 
            You can also step back and forward instead of jumping, or use a bench or a ball to elevate your hands.<br> 
            You can also do the exercise at a slower pace or with fewer repetitions.`
        ]
    ),

    new Workout(
        `Chin Ups`,
        `An upper-body exercise that strengthens the biceps, forearms, and back muscles by pulling up with palms facing towards the body.`,
        `Advanced`,
        [
            `Lats`,
            `Biceps`,
            `Forearms`
        ],
        `incremental`,
        [
            `Grip the bar with palms facing you, hands shoulder-width apart.`,
            `Start from a dead hang with arms fully extended.`,
            `Pull your body up until your chin clears the bar.`,
            `Hold for a moment at the top with your chin over the bar.`,
            `Lower yourself back down to a full hang in a controlled manner.`
        ],
        [
            `Full Extension: Arms fully extend in the hanging position, ensuring a full range of motion.`,
            `Chin Over Bar: Your chin reaches above the bar with each pull-up without straining your neck.`,
            `Smooth Movement: Consistent, controlled movements without swinging or kipping.`
        ],
        [
            `Momentum Use: Utilizing swinging motions of the legs or body to propel upwards.`,
            `Incomplete Range: Not lowering down to a full hang or failing to pull the chin over the bar.`,
            `Excessive Neck Strain: Jutting the chin upwards forcefully to clear the bar, straining the neck.`
        ],
        {
            front: `/assets/videos/male-bodyweight-chinup-front.mp4`,
            side: `/assets/videos/male-bodyweight-chinup-side.mp4`,
        },
        [
            `If you are unable to do a full chin up, you can try to use a resistance band or a machine to assist you.<br> 
            This will provide some support and reduce the amount of weight you have to lift.<br> 
            You can also use a spotter to help you pull yourself up, or use a chair or a box to jump up and lower yourself down slowly. You can also do partial reps or isometric holds to build strength.`
        ]
    ),

    new Workout(
        `Pull Ups`,
        `A challenging upper-body workout that targets the upper back, shoulders, and arms by pulling up with palms facing away from the body.`,
        `Advanced`,
        [
            `Lats`,
            `Upper Back`,
            `Shoulders`
        ],
        `incremental`,
        [
            `Grip the bar with palms facing away, wider than shoulder-width apart.`,
            `Hang with straight arms and legs off the ground.`,
            `Pull yourself up until your chest is close to the bar.`,
            `Pause briefly with your chest near the bar.`,
            `Lower back to the starting position in a controlled motion.`
        ],
        [
            `Full Extension: Arms fully extend in the hanging position, ensuring a full range of motion.`,
            `Chin Over Bar: Your chin reaches above the bar with each pull-up without straining your neck.`,
            `Smooth Movement: Consistent, controlled movements without swinging or kipping.`
        ],
        [
            `Momentum Use: Utilizing swinging motions of the legs or body to propel upwards.`,
            `Incomplete Range: Not lowering down to a full hang or failing to pull the chin over the bar.`,
            `Excessive Neck Strain: Jutting the chin upwards forcefully to clear the bar, straining the neck.`
        ],
        {
            front: `/assets/videos/male-bodyweight-pullup-front.mp4`,
            side: `/assets/videos/male-bodyweight-pullup-side.mp4`,
        },
        [
            `If you are unable to do a full pull up, you can try to use a resistance band or a machine to assist you.<br> 
            This will provide some support and reduce the amount of weight you have to lift.<br> 
            You can also use a spotter to help you pull yourself up, or use a chair or a box to jump up and lower yourself down slowly. You can also do partial reps or isometric holds to build strength.`
        ]
    ),

];
  
export { workouts };