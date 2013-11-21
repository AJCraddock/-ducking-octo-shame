define(
    [],
    function(){
        Maps = 
        [   
            {
                "Player": {"x":80, "y":20},
                "GameObjects":
                [
                    {"type":"GoalPlatform", "x":4500, "y":525},
                    //starting platform, floor, and back border
                    {"type":"GameObject", "x":80, "y":300, "width":100, "height":10},
                    {"type":"GameObject", "x":0, "y":0, "width":30, "height":600},
                    {"type":"GameObject", "x":0, "y":525, "width":600, "height":10},
                    {"type":"GameObject", "x":605, "y":525, "width":600, "height":10},
                    {"type":"GameObject", "x":1210, "y":525, "width":600, "height":10},
                    {"type":"GameObject", "x":1820, "y":525, "width":600, "height":10},
                    {"type":"GameObject", "x":2425, "y":525, "width":600, "height":10},
                    {"type":"GameObject", "x":3030, "y":525, "width":600, "height":10},
                    //lava final stretch
                    {"type":"DangerousGameObject", "x":3630, "y":525, "width":800, "height":10},
                    //bill obstacle course
                    {"type":"GameObject", "x":1800, "y":360, "width":800, "height":100},
                    {"type":"GameObject", "x":2600, "y":360, "width":800, "height":10},
                    {"type":"GameObject", "x":2800, "y":475, "width":50, "height":50},
                    {"type":"GameObject", "x":3100, "y":465, "width":50, "height":60},
                    //bill starting position
                    {"type":"Robot", "x":80, "y":90},
                ],
                "Background": '#000000'
            },
            {
                "Player": {"x":80, "y":20},
                "GameObjects":
                [
                    {"type":"GoalPlatform", "x":7500, "y":525},
                    //back border and start platform
                    {"type":"GameObject", "x":80, "y":300, "width":100, "height":10},
                    {"type":"GameObject", "x":0, "y":0, "width":30, "height":600},
                    //lava floor
                    {"type":"DangerousGameObject", "x":0, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":605, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":1210, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":1820, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":2425, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":3030, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":3635, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":4240, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":4845, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":5450, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":6055, "y":525, "width":600, "height":100},
                    {"type":"DangerousGameObject", "x":6660, "y":525, "width":600, "height":100},
                    //obstacle platforms
                    {"type":"GameObject", "x":800, "y":400, "width":100, "height":60},
                    {"type":"GameObject", "x":3000, "y":400, "width":600, "height":60},
                    {"type":"GameObject", "x":5000, "y":400, "width":400, "height":60},
                    //robot position
                    {"type":"Robot", "x":80, "y":90},
                ],
                "Background": '#000000'
            },
            {
                "Player": {"x":80, "y":80},
                "GameObjects":
                [
                    {"type":"GoalPlatform", "x":3500, "y":525},
                    {"type":"GameObject", "x":0, "y":525, "width":600, "height":10},
                    {"type":"GameObject", "x":0, "y":0, "width":30, "height":600},
                    {"type":"StaticFire", "x":150, "y":400, "width":50, "height":50},
                    {"type":"DangerousMechanism", "x":400, "y":225, "width":90, "height":100, "cycles_to_goal":500, "goals":[
                            {"x":400, "y":525}
                        ]
                    },
                    {"type":"Robot", "x":300, "y":490},
                    {"type":"Mechanism", "x":700, "y":525, "width":600, "height":100, "cycles_to_goal":200, "goals":[
                            {"x":700, "y":100}
                        ]
                    },
                    {"type":"Mechanism", "x":1400, "y":100, "width":600, "height":10, "cycles_to_goal":200, "goals":[
                            {"x":1400, "y":525}
                        ]
                    },
                    {"type": "GameObject", "x":2100, "y":525, "width":600, "height":10},
                    {"type":"Mechanism", "x":2800, "y":525, "width":100, "height":10, "cycles_to_goal":200, "goals":[
                            {"x":3300, "y":525}
                        ]
                    },
                ],
                "Background": '#000000'
            },
            {
                "Player": {"x":80, "y":80},
                "GameObjects":
                [
                    {"type": "GameObject", "x":0, "y":0, "width":30, "height":600},
                    {"type":"GoalPlatform", "x":3500, "y":525},
                    {"type":"Mechanism", "x":31, "y":525, "width":300, "height":100, "cycles_to_goal":200, "goals":[
                            {"x":31, "y":200}
                        ]
                    },
                    {"type":"Mechanism", "x":400, "y":225, "width":90, "height":100, "cycles_to_goal":100, "goals":[
                            {"x":400, "y":525}
                        ]
                    },
                    {"type":"Mechanism", "x":700, "y":525, "width":600, "height":100, "cycles_to_goal":200, "goals":[
                            {"x":700, "y":100}
                        ]
                    },
                    {"type":"Mechanism", "x":1400, "y":100, "width":600, "height":10, "cycles_to_goal":200, "goals":[
                            {"x":1400, "y":525}
                        ]
                    },
                    {"type": "GameObject", "x":2100, "y":525, "width":600, "height":10},
                    {"type":"Mechanism", "x":2800, "y":525, "width":100, "height":10, "cycles_to_goal":200, "goals":[
                            {"x":3300, "y":525}
                        ]
                    },
                ],
                "Background": '#000000'
            },
        ];

        return Maps;
    }
);