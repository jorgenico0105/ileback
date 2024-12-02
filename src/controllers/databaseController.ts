import type { Request, Response } from 'express';
import { pool } from '../config/database';

export class dataController {
  static updateData = async (req: Request, res: Response) => {
    const { database, data } = req.body;
    if (!database || !data || !Array.isArray(data)) {
      return res.status(400).json({
        message: 'Se requiere el nombre de la base de datos y un arreglo de datos válido.',
      });
    }
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.changeUser({ database });
      for (const item of data) {
        const keys = Object.keys(item);
        const values = Object.values(item);
        if (!keys.includes('Codigo')) {
          throw new Error("Cada objeto debe contener un campo 'Codigo'.");
        }
        if(keys.includes('Semana') || keys.includes('Dia')){
         const sql = `
         UPDATE clientes AS c INNER JOIN clientesdiavisita AS cdv ON 
         c.Codigo=cdv.CodigoCliente SET
         ${keys
          .filter(key=>key!=='Codigo' && key!=='Semana' && key!=='Dia')
          .map(key=>`c.${key}=?`)
          .join(', ')},
          cdv.Dia=?,
          cdv.Semana=?
          WHERE c.Codigo=?;
         `;
         const filteredData=[
          ...values.filter(
            (_, index) => keys[index] !== 'Codigo' && keys[index] !== 'Semana' && keys[index] !== 'Dia'
          ),
          item['Dia'],
          item['Semana'],
          item['Codigo'],
         ];
         await connection.query(sql,filteredData)
        }else{
        const updateFields = keys
          .filter(key => key !== 'Codigo')
          .map(key => `${key} = ?`)
          .join(', ');
        const sql = `UPDATE clientes SET ${updateFields} WHERE Codigo = ?`;
        await connection.query(sql, [...values.filter((_, index) => keys[index] !== 'Codigo'), item['Codigo']]);
        }}
      res.json({
        message:'Datos Correctamente actulizados'
    })
    } catch (error: any) {
      console.error('Error :', error.message);
      res.status(500).json({ message:`Error: ${error}` });
    } finally {
      if (connection) {
        connection.release();
        console.log('Conexion off');
      }
    }
  };
}
