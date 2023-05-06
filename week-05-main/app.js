//MENU APP

//creating a musician class
class Musician {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    describe() {
        return `${this.name} is a ${this.position}.`;
    }
};

//creating a band class
class Band {
    constructor(name) {
        this.name = name;
        this.musicians = [];
    }

//This makes sure that onlt instances of the Musician class can be added.
    addMusician(musician){
        if(musician instanceof Musician) {
            this.musicians.push(musician);
        } else {
            throw new Error(`You can only add an instance of Musician. Argument is not a: ${musician}`)
        }
    }

    describe() {
        return `${this.name} has ${this.musicians.length} members.`
    }
};

//creating a menu to interact with
class Menu {
    constructor() {
        this.bands = [];
        this.selectedBand = null;
    }

//this provides the functionality of the interactive window
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createBand();
                    break;
                case '2':
                    this.viewBand();
                    break;
                case '3':
                    this.deleteBand();
                    break;
                case '4':
                    this.displayBands();
                    break;
                default:
                    selection = 0;    
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

//this shows the options to the user
    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create new band
            2) View band
            3) Delete band
            4) Display all bands
        `);
    }

//this shows options to the user within view band
    showBandMenuOptions(bandInfo) {
        return prompt(`
            0) Back
            1) Create member
            2) Delete member
            -----------------
            
            ${bandInfo}
        `);
    }

//this will display all bands in a list
    displayBands() {
        let bandString = '';
        for(let i = 0; i < this.bands.length; i++) {
            bandString += (i + ') ' + this.bands[i].name + '\n');
        }
        alert(bandString);
    }

//this prompts the user to create a new band 
    createBand() {
        let name = prompt('Enter name for your band:');
        this.bands.push(new Band(name));
    }

//this allows the user to view a band by index and lets user add or delete members.
    viewBand() {
        let index = prompt('Enter the index of the band you want to view:');
        if(index > -1 && index < this.bands.length) {
            this.selectedBand = this.bands[index];
            let description = 'Band name: ' + this.selectedBand.name + '\n';

            for(let i = 0; i < this.selectedBand.musicians.length; i++) {
                description += i + ') ' + this.selectedBand.musicians[i].name + ' - ' 
                    + this.selectedBand.musicians[i].position + '\n';
            }

            let selection = this.showBandMenuOptions(description);
            switch(selection) {
                case '1':
                    this.createMember();
                    break;
                case '2':
                    this.deleteMember();
            }
        }
    }

//this allows the user to delete a band by index.
    deleteBand() {
        let index = prompt('Enter the index of the band you want to delete:');
        if(index > -1 && index < this.bands.length) {
            this.bands.splice(index, 1);
        }
    }

//this prompts the user to add a member to the band that is being viewed.
    createMember() {
        let name = prompt('Enter name for a band member:');
        let position = prompt('Enter this members postion in the band:');
        this.selectedBand.musicians.push(new Musician(name, position));
    }

//this lets the user delete a member from the band being viewed.
    deleteMember() {
        let index = prompt('Enter the index of the mamber you want to delete:');
        if(index > -1 && index < this.selectedBand.musicians.length) {
            this.selectedBand.musicians.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();