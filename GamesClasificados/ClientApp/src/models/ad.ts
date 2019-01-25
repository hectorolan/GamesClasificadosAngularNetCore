export class Ad {
    static prices: string[] = [
        '0.00', '3.00', '5.00', '10.00', '15.00',
        '20.00', '25.00', '30.00', '35.00',
        '40.00', '45.00', '50.00', '55.00',
        '60.00', '70.00', '80.00', '90.00',
        '100.00', '125.00', '150.00', '175.00',
        '200.00', '225.00', '250.00', '275.00',
        '300.00', '350.00'
    ];

    id: number;
    title: string;
    ownerId: number;
    price: number;
    consoleId: number;
    sectionId: number;
    imageUrl: string;
    description: string;
    expired: boolean;
    datePosted: Date;

    // Otional parameters
    ownerName: string;
    city: string;
    telephone: string;
    email: string;
    preferedContactMethod: string;


    constructor(
        id = 0,
        title = '',
        ownerId = 0,
        price = 0,
        consoleId = 0,
        sectionId = 0,
        imageUrl = '',
        description = '',
        expired = false,
        datePosted = new Date()) {
        this.id = id;
        this.title = title;
        this.ownerId = ownerId;
        this.price = price;
        this.consoleId = consoleId;
        this.sectionId = sectionId;
        this.imageUrl = imageUrl;
        this.description = description;
        this.expired = expired;
        this.datePosted = datePosted;
    }

    public static getAdFromObject(object: any): Ad {
        let ad: Ad = new Ad(object.id, object.title, object.ownerId, object.price,
            object.consoleId, object.sectionId, object.imageUrl, object.description,
            object.expired, object.datePosted);
        return ad;
    }
}
