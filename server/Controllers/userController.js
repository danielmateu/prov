import sql from 'mssql';

const UserController = {};

UserController.updateProfileImage = async (req, res) => {
    const { externalLoginId, profileImageUrl } = req.body;

    try {
        // Crear una nueva solicitud SQL
        const request = new sql.Request();

        const query = `
            UPDATE Ex_Login
            SET ProfileImageUrl = @profileImageUrl 
            WHERE ExternalLoginID = @externalLoginId
        `;

        // Usar request directamente en lugar de pool.request()
        request.input('profileImageUrl', sql.VarChar, profileImageUrl);
        request.input('externalLoginId', sql.Int, externalLoginId);

        await request.query(query);

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(500).json({ error: 'Failed to update profile image' });
    }
};

export default UserController;