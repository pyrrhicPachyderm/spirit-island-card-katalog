namespace Types {
    export enum Speed {
        Fast = "Fast",
        Slow = "Slow",
    }

    export enum Land {
        Ocean = "Ocean",
        Jungle = "Jungle",
        Wetland = "Wetland",
        Mountain = "Mountain",
        Sand = "Sand",
        Coastal = "Coastal",
    }

    export const LandAny = [Land.Ocean, Land.Jungle, Land.Wetland, Land.Mountain, Land.Sand, Land.Coastal];

    export enum TargetSpirit {
        Any = "Any Spirit",
        Another = "Another Spirit",
    }

    export enum TargetProperty {
        Dahan = "Dahan",
        Invaders = "Invaders",
        Blight = "Blight",
        NoBlight = "No Blight",
        NoInvaders = "No Invaders",
    }

    export type Target = Land | Land[] | TargetSpirit | TargetProperty;

    export enum Source {
        Site = "Site",
        SacredSite = "SacredSite",
    }

    export class Ranges {
        constructor(public from: Source, public range: number | number[], public land?: (Land[] | undefined)) {
        }

        toString() {
            let res = this.from + " ";
            if (this.land) {
                res += "on" + this.land + ", ";
            }
            return res + this.range;
        }

        valueOf() {
            return this.range;
        }
    }

    export enum Elements {
        Sun = "Sun",
        Moon = "Moon",
        Fire = "Fire",
        Air = "Air",
        Water = "Water",
        Earth = "Earth",
        Plant = "Plant",
        Animal = "Animal",
    }

    export enum Spirit {
        ASpreadOfRampantGreen = "A Spread of Rampant Green",
        BringerOfDreamsAndNightmares = "Bringer of Dreams and Nightmares",
        LightngingsSwiftStrike = "Lightning's Swift Strike",
        OceansHungryGrasp = "Ocean's Hungry Grasp",
        RiverSurgesInSunlight = "River Surges in Sunlight",
        ShadowsFlickerLikeFlame = "Shadows Flicker Like Flame",
        Thunderspeaker = "Thunderspeaker",
        VitalStrengthOfTheEarth = "Vital Strength of the Earth",
    }

    export enum CardType {
        BasegameMinor = "Basegame Minor",
        BasegameMajor = "Basegame Major",
        ExpansionMinor = "Expansion Minor",
        ExpansionMajor = "Expansion Major",
    }

    export type PowerType = Spirit | CardType;

    export class Card {
        constructor(public type: PowerType, public name: string, public cost: number, public speed: Speed,
                    public range: Ranges | null, public target: Target, public elements: Elements[],
                    public description: string) {
        }

        toSearchString() {
            let s = this.type + " " + this.cost + " " + this.name + " " + this.speed;
            if (this.range != null) {
                s += " " + this.range.from + " " + this.range.range;
            }
            if (this.target == LandAny) {
                s += " Any";
            }
            s += " " + this.target + " " + this.elements + " " + this.description;
            return s;
        }

        toCard() {
            let container = document.createElement("div");
            container.classList.add("flip-container");
            container.onclick = () => container.classList.toggle("flipped");
            let flipper = document.createElement("div");
            flipper.classList.add("flipper");

            let front = document.createElement("div");
            front.classList.add("front");
            let img = document.createElement("img");
            img.src = this.toImageName();
            front.appendChild(img);

            let back = document.createElement("div");
            back.classList.add("back");
            let backdiv = document.createElement("div");
            backdiv.style.paddingLeft = "10px";
            backdiv.style.paddingRight = "10px";
            let text = "";
            text += "<b>Type</b>: " + this.type + "<br/>";
            text += "<b>Name</b>: " + this.name + "<br/>";
            text += "<b>Cost</b>: " + this.cost + "<br/>";
            text += "<b>Speed</b>: " + this.speed + "<br/>";
            text += "<b>Range</b>: " + this.range + "<br/>";
            let target = "";
            if (Array.isArray(this.target)) {
                if (this.target == LandAny) {
                    target = "Any"
                } else {
                    target = (this.target as Land[]).join(", ");
                }
            } else {
                target = this.target;
            }
            text += "<b>Target</b>: " + target + "<br/>";
            text += "<b>Elements</b>: " + this.elements.join(", ") + "<br/>";
            text += "<b>Description</b>: " + this.description + "<br/>";
            let p = document.createElement("span");
            p.classList.add("backtext");
            p.innerHTML = text;
            backdiv.appendChild(p);
            back.appendChild(backdiv);

            flipper.appendChild(back);
            flipper.appendChild(front);
            container.appendChild(flipper);
            return container;
        }

        toImageName() {
            return "imgs/cards/" + this.name.toLowerCase().replace(/ /g, "_").replace(/[^a-z_]/g, "") + ".jpg";
        }
    }
}

