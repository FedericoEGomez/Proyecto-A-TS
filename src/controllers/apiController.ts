import { Request, Response } from 'express';
import Foods from '../models/foods';
import axios from "axios";

class ApiController {

    async verComidas (req: Request, res: Response) {
        const foods = await Foods.find();
        console.log(foods);
        res.status(200).json({foods});
    }

    async guardarComida(req: Request, res: Response) {
        try {
            const foods = new Foods(req.body);
            await foods.save();
            console.log(foods);
            res.status(201).json({foods});
        } catch (error) {
            console.log(error);
            res.status(501).json(error);
        } 
    }

    async apiVerComidas(req: Request, res: Response){
        const token = req.header("JWTtoken");
        try {
            const {data} = await axios.get('http://localhost:8081/api/v1/ver/consumo-final',{
                headers: {
                    JWTtoken: token
                }
            })
            res.status(200).json({data})
        } catch (error:any) {
            res.status(400).json({error:error.response.data})
        }
    }
    async apiCrearComidas(req: Request, res: Response){
        const token = req.header("JWTtoken");
        try {
            const {data} = await axios.post('http://localhost:8081/api/v1/crear/consumo-final',
            {
                nombre: req.body.nombre,
                tipo: req.body.tipo,
                precio: req.body.precio,
                descripcion: req.body.descripcion
            },{
                headers: {
                    JWTtoken: token
                }
            })
            res.status(201).json({data})
        } catch (error:any) {
            res.status(400).json({error:error.response.data})
        }
    }

}

export default new ApiController