import MessageManagerMongo from "../daos/Mongo/MessageDaoMongo.js";

export class MessageController{
        constructor (){
            this.messageService =new MessageManagerMongo()
        }


addMessage =async (req, res) => {
    const { user, message } = req.body;

    try {
        const newMessage = await this.messageService.addMessage(user, message);
        res.json(newMessage);
        req.logger.info("Se ha agregado un nuevo mensaje:", newMessage);
    } catch (error) {
        // Manejar errores y registrarlos
        req.logger.error("Error al agregar el mensaje:", error);
        res.status(500).json({ error: "Error al agregar el mensaje" });
    }
}

getAllMessages = async (req, res) => {
    
    try {
        const messages = await this.messageService.getAllMessages();
        res.json(messages);
        req.logger.info("Obteniendo todos los mensajes:", messages);
    } catch (error) {
        // Manejar errores y registrarlos
        req.logger.error("Error al obtener los mensajes:", error);
        res.status(500).json({ error: "Error al obtener los mensajes" });
    }
}
}