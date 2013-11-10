define(
    [],
    function(){
        Maps = 
        [
            {
            "Player": {"x":80, "y":80},
            "GameObjects":
            [
                {"type":"GoalPlatform", "x":3500, "y":525},
                {"type":"GameObject", "x":0, "y":525, "width":600, "height":10},
                {"type":"GameObject", "x":0, "y":0, "width":30, "height":600},
                {"type":"DangerousGameObject", "x":150, "y":400, "width":50, "height":50},
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