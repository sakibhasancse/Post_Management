export class GenaralError extends Error {
        constructor(message){
            super()
            console.log(this)
            this.message = message
        }

        getCode() {return 400}

}

export class BadRequest extends GenaralError{
        getCode () {return 400}
}

export class NotFound extends GenaralError{
        getCode() {return 404}
}