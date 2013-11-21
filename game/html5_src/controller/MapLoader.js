define(
    //dependencies
    ['model/Map', 'model/Maps', 'model/Player', 'model/GameObject', 
    'model/GoalPlatform', 'model/Mechanism', 'model/DangerousGameObject',
    'model/DangerousMechanism', 'model/Robot', 'model/Resources'],

    //module definition
    function(Map, Maps, Player, GameObject, GoalPlatform, Mechanism, DangerousGameObject, DangerousMechanism, Robot, Resources){

        //constructor
        function MapLoader(){
            //fields
            this.curr_map_index = 0;
			this.game_music = new Array();

			this.game_music.push(new Audio("resources/music/audio1.mp3"));
			this.game_music.push(new Audio("resources/music/audio2.mp3"));
        }

        // maps are dictionaries of player, game objects, and background
        MapLoader.create_map = function(map_json){
            // GameObjects is a list of dictionaries representing game objects
            var json_game_objects = map_json.GameObjects;
            var game_objects = new Array();
            var robot;

            for(var i = 0; i < json_game_objects.length; i++){
                var game_object = json_game_objects[i];

                switch(game_object.type){
                    case 'GameObject':
                        if(game_object.image == null){
                            game_objects.push(new GameObject(game_object.x, game_object.y, game_object.width, game_object.height));
                        }else{
                            // handle creating an object with a set image
                        }
                        break;
                    case 'Mechanism':
                        game_objects.push(new Mechanism(game_object.x, game_object.y, game_object.width, game_object.height, game_object.cycles_to_goal, game_object.goals, null));
                        break;
                    case 'GoalPlatform':
                        game_objects.push(new GoalPlatform(game_object.x, game_object.y));
                        break;
                    case 'DangerousGameObject':
                        game_objects.push(new DangerousGameObject(game_object.x, game_object.y, game_object.width, game_object.height));
                        break;
                    case 'StaticFire':
                        game_objects.push(new DangerousGameObject(game_object.x, game_object.y, game_object.width, game_object.height));
                        break;
                    case 'DangerousMechanism':
                        game_objects.push(new DangerousMechanism(game_object.x, game_object.y, game_object.width, game_object.height, game_object.cycles_to_goal, game_object.goals, null));
                        break;
                    case 'MovingFire':
                        game_objects.push(new DangerousMechanism(game_object.x, game_object.y, game_object.width, game_object.height, game_object.cycles_to_goal, game_object.goals, null));
                        break;
                    case 'Robot':
                        robot = new Robot(game_object.x, game_object.y);
                        game_objects.push(robot);
                        break;
                }
            }

            var player = new Player(map_json.Player.x, map_json.Player.y);
            
            var background_image = Resources.background;
            var background = document.createElement('canvas');
            background.width = 800;
            background.height = 600;
            var temp_graphics = background.getContext('2d');
            // temp_graphics.fillStyle = map_json.Background;
            temp_graphics.drawImage(background_image, 0, 0, background.width, background.height);
            
            return new Map(player, robot, game_objects, background);
        };

        //superclass definition
        MapLoader.prototype = {
            constructor: MapLoader,

            load_next_map: function(){
                this.curr_map_index = (this.curr_map_index+1)%Maps.length;
                var map = MapLoader.create_map(Maps[this.curr_map_index]);
                var curr_song = Math.floor( Math.random() * 2);
				
				this.game_music[curr_song].play();
				return map;
				
            },

            reset_curr_map: function(){
                var map = MapLoader.create_map(Maps[this.curr_map_index]);
				var curr_song = Math.floor( Math.random() * 2);
				
				this.game_music[curr_song].play();
                return map;
            }
        };
        return MapLoader;
    }
);