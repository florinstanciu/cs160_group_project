import Pins from "pins";import {    HorizontalSlider, HorizontalSliderBehavior} from 'sliders';import {    FieldScrollerBehavior,    FieldLabelBehavior} from 'field';import {    SystemKeyboard} from 'keyboard';//@program/* Skins */let background = new Skin({ fill: '#F2F2F2' });let orangeSkin = new Skin({ fill: '#F2994A' });let blueSkin = new Skin({ fill: '#56CCF2' });let whiteSkin = new Skin({ fill: 'white' });/* Navigation bar */let inventorySkin = new Skin({      width: 54, height:54,      texture: new Texture("assets/inventory.png"),      fill: "white",      aspect: "fit"});let inventoryButton = new Content({	name: 'invBtn',	width: 30, height: 30, 	right: 30, left: 50, skin: inventorySkin,	active: true,	behavior: Behavior ({		onTouchEnded: function(content, id, x, y, ticks) {			if (application.main.shopping) {				application.main.remove(shopScreen);				application.main.insert(inventoryScreen, application.main.nav);				application.add(addItemButton);			} else if (application.main.addItem) {				application.main.remove(addItemScreen);				application.main.insert(inventoryScreen, application.main.nav);				application.add(addItemButton);			}		}	})});let shoppingSkin = new Skin({      width: 48, height:48,      texture: new Texture("assets/shopping.png"),      fill: "white",      aspect: "fit"});let shoppingButton = new Content({	name: 'shopBtn',	width: 30, height:30,	right: 50, left:30, skin: shoppingSkin,	active: true,	behavior: Behavior ({		onTouchEnded: function(content, id, x, y, ticks) {			if (application.main.inventory) {				application.main.remove(inventoryScreen);				application.remove(addItemButton);				application.main.insert(shopScreen, application.main.nav);			} else if (application.main.addItem) {				application.main.remove(addItemScreen);				application.main.insert(shopScreen, application.main.nav);			}		}			})});/* Inventory Screen */let invItem = Line.template($ => ({	skin: whiteSkin,	width: 280,	top: 10,	contents: [		new Picture({			url: $.img,			width: 70, height: 70		}),		new Column({			left: 10,			contents: [				new Label({ 					style: new Style({ font: 'bold 22px Avenir', color: 'black' }),					string: $.itemName				}),				new Label({ 					style: new Style({ font: '22px Avenir', color: 'black' }),					string: $.info				})			]		})	]}))let inventoryScreen = new Column({ 			skin: background,			width: 320, height: 360,			name: 'inventory',			contents: [				new invItem({ itemName: 'bell peppers', info: 'put info here', 					img: 'assets/bell-peppers.png' }),				new invItem({ itemName: 'bell peppers', info: 'put info here',					img: 'assets/bell-peppers.png' }),				new invItem({ itemName: 'bell peppers', info: 'put info here', 					img: 'assets/bell-peppers.png' }),				new invItem({ itemName: 'bell peppers', info: 'put info here',					img: 'assets/bell-peppers.png' })			]		});let addItemSkin = new Skin({      width: 85, height: 85,      texture: new Texture("assets/addbtn.png"),      fill: "white",      aspect: "fit"});let addItemButton = new Content({	name: 'addbtn',	width: 60, height:60,	top: 365, left: 250,	skin: addItemSkin,	active: true,	behavior: Behavior ({		onTouchEnded: function(content, id, x, y, ticks) {			application.main.remove(inventoryScreen);			application.remove(addItemButton);			application.main.insert(addItemScreen, application.main.nav);		}			})});/* Add item screen */let nameInputSkin = new Skin({ borders: { left: 1, right: 1, top: 1, bottom: 1 }, stroke: 'gray' });let fieldStyle = new Style({ color: 'black', font: '20px', horizontal: 'left',    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });let fieldHintStyle = new Style({ color: '#aaa', font: '20px', horizontal: 'left',    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });let itemName;let itemNameField = Container.template($ => ({     width: 250, height: 30, top: 20, skin: nameInputSkin, contents: [        Scroller($, {             left: 4, right: 4, top: 4, bottom: 4, active: true,             Behavior: FieldScrollerBehavior, clip: true,             contents: [                Label($, {                     left: 0, top: 0, bottom: 0, skin: fieldLabelSkin,                     style: fieldStyle, anchor: 'NAME',                    editable: true, string: $.name,                    Behavior: class extends FieldLabelBehavior {                        onEdited(label) {                            let data = this.data;                            data.name = label.string;                            label.container.hint.visible = (data.name.length == 0);                            itemName = data.name;                        }                    },                }),                Label($, {                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,                    string: "Item name", name: "hint"                }),            ]        })    ]}));let freshness;let FreshnessSlider = HorizontalSlider.template($ => ({    height: 30, left: 50, right: 50, top:10,    Behavior: class extends HorizontalSliderBehavior {        onValueChanged(container) {        	let amount = Math.floor( this.data.value );            addItemScreen.freshness.string = amount + " days old";            freshness = amount;        }    }}));	let submitButton = Container.template($ => ({	skin: new Skin({ fill: '#2D9CDB' }),
	top: 10,	width: 80, height: 30,	contents: [		new Label({			name: 'submitButton', string: 'FINISH', style: new Style({ font: 'bold 24px Avenir', color: 'white' })		})	],	active: true,	behavior: Behavior ({		onTouchEnded: function(content, id, x, y, ticks) {
			// add item to inventory with name itenName and freshness freshness		}	}) }));let addItemScreen = new Column({ 			skin: background,			name: 'addItem',			width: 320, height: 360,			contents: [ 				new itemNameField({name:''}),				new FreshnessSlider({ min: 0, max: 5, value: 0 }),				new Label({ 					top: 0,					name: "freshness",					string: "0 days old", 					style: new Style({ font: "20px Avenir", color: 'black' }) }),				new Column({					skin: new Skin({ fill: '#c4c4c4' }),					top: 10,					width: 220, height:180,					contents: [						new Label({ 							top:60, bottom: 0, left:10, right: 10,							style: new Style({ font: "bold 25px Avenir", color: "white" }),							string: "Press SCAN on"						}),						new Label({ 							top: 0, bottom: 60, left:10, right: 10,							style: new Style({ font: "bold 25px Avenir", color: "white" }),							string: "the food scanner!"						})					]				}),				new submitButton()			],		    Behavior: class extends Behavior {		        onTouchEnded(content) {		            SystemKeyboard.hide();		            content.focus();		        }		    }		});/* Shopping screen */	let shopScreen = new Column({ 			skin: background,			name: 'shopping',			width: 320, height: 360,			contents: [ 				//takePicButton				new Label({ 					string: "shopping screen here", 					style: new Style({ font: "30px Avenir", color: 'black' }) })			]		});/* Main screen */let mainScreen = new Column({ 	name: 'main',	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,	contents: [		new Line({			name: 'header',			skin: new Skin({ fill: 'white' }),			height: 70, width: 320,			contents: [				new Label({ 					left: 20,					string: "Foodwise", 					style: new Style({ font: 'bold 50px Avenir', color: '#2D9CDB' })}),			]		}),		inventoryScreen,		new Line({			skin: new Skin({ fill: 'white' }),			name: 'nav', 			width: 320, height: 50,			bottom: 0,			contents: [				inventoryButton,				shoppingButton			]		})	]});/* Pins stuff */let remotePins;application.behavior = Behavior({    onLaunch(application) {        application.add(mainScreen);        application.add(addItemButton);        this.data = { labels: {} };        let discoveryInstance = Pins.discover(            connectionDesc => {                if (connectionDesc.name == "amount-sensors") {                    trace("Connecting to remote pins\n");                    remotePins = Pins.connect(connectionDesc);                    remotePins.invoke("/food/read", value => {						application.main.amounts.bowls.foodCol.bowl.text.string = value.amount.toPrecision(2) + ' cups';					});					remotePins.invoke("/water/read", value => {						application.main.amounts.bowls.waterCol.bowl.text.string = value.amount.toPrecision(2) + ' cups';					});                }            },             connectionDesc => {                if (connectionDesc.name == "amount-sensors") {                    trace("Disconnected from remote pins\n");                    remotePins = undefined;                }            }        );	}});// stuff down here isn't part of the app, just for reference (from my pet app)let sliderOn;let foodBowl = new Container({	name: 'bowl',	width: 110, height: 110,	left: 10, right: 10,  skin: orangeSkin,	contents: [		new Label({ name: 'text', string: 'Food', style: new Style({font: '30px Avenir', color: 'white'}) })	],	active: true,	behavior: Behavior ({		onTouchEnded: function(content, id, x, y, ticks) {			if (!sliderOn) {				sliderOn = true;				application.main.amounts.add(AmountSlider({ min: 0, max: 5, value: 0 }));				application.main.amounts.add(new Label({ 					name: 'amount', string: 'New food amount: 0 cups',					style: new Style({font: '22px Avenir', color: 'black'})				}));				application.main.amounts.add( new Line({					top: 10,					contents: [ new cancelButton(), new submitButton({ bowl: "Food" }) ] 				}));			}		}	}) });let waterBowl = new Container({	name: 'bowl',	width: 110, height: 110,	left: 10, right:10, skin: blueSkin,	contents: [		new Label({ name:'text',string: 'Water', style: new Style({font: '30px Avenir', color: 'white'}) })	],	active: true,	behavior: Behavior ({		onTouchEnded: function(content, id, x, y, ticks) {			if (!sliderOn) {				sliderOn = true;				content.container.container.container.add(AmountSlider({ min: 0, max: 5, value: 0 }));				content.container.container.container.add(new Label({ 					name: 'amount', string: 'New water amount: 0 cups',					style: new Style({font: '22px', color: 'black'})				}));				content.container.container.container.add( new Line({					top: 10,					contents: [ new cancelButton(), new submitButton({ bowl: "Water" }) ] 				}));			}		}	}) });let newAmount;let AmountSlider = HorizontalSlider.template($ => ({    height: 50, left: 50, right: 50,    Behavior: class extends HorizontalSliderBehavior {        onValueChanged(container) {        	let amount = this.data.value.toPrecision(2);            trace("Value is: " + amount + "\n");            application.main.amounts.amount.string = amount + ' cups';            newAmount = amount;        }    }}));let cancelButton = Container.template($ => ({	skin: new Skin({ fill: 'gray' }),	width: 80, height: 30, bottom: 30,	left: 10, right:10,	contents: [		new Label({			name: 'cancelButton', string: 'Cancel', style: new Style({ font: 'bold 22px Avenir', color: 'white' })		})	],	active: true,	behavior: Behavior ({		onTouchEnded: function(content, id, x, y, ticks) {			application.main.amounts.empty(1, 4);			sliderOn = false;		}	}) }));