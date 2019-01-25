export class User {
    //[index: string]: string | boolean | number;
    methodTextMessage: boolean = false;
    methodCall: boolean = false;
    methodEmail: boolean = false;

    // From API
    id: number;
    name: string;
    profilePictureURL: string;
    email: string;
    telephone: string;
    city: string;
    country: string;
    showPhone: boolean;
    showEmail: boolean;
    preferedContactMethod: string;

    constructor(
    id = 0,
    name = '',
    email = '',
    avatarURL = '',
    telephone = '',
    city = '',
    country = '',
    telephoneOnAd = false,
    emailOnAd = false,
    preferedContactMethod = '')
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profilePictureURL = avatarURL;
        this.telephone = telephone;
        this.city = city;
        this.country = country;
        this.showPhone = telephoneOnAd;
        this.showEmail = emailOnAd;
        this.preferedContactMethod = preferedContactMethod;
        User.updateUserMethods(this);
    }

    public static getUserFromObject(object: any): User {
        console.log('ASD ' + JSON.stringify(object));
        let user: User = new User(object.id, object.name, object.email, object.profilePictureURL, object.telephone, object.city, object.country, object.showPhone, object.showEmail, object.preferedContactMethod);
        return user;
    }

    public static updateUserMethods(user: User) {
        if (user.preferedContactMethod == null) {
            // The user have not set it yet the prefered contact method.
            return;
        }
        let methods: string[] = user.preferedContactMethod.split(',');
        if (methods.length == 3) {
            user.methodTextMessage = methods[0] === 'true';
            user.methodCall = methods[1] === 'true';
            user.methodEmail = methods[2] === 'true';
        }
    }
}
