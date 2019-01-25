export class Section {
    id: number;
    name: string;

    constructor(id = 0, name = '') {
        this.id = id;
        this.name = name;
    }

    public static getSectionFromObject(object: any): Section {
        let section: Section = new Section(object.id, object.name);
        return section;
    }
}
