const createTask = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        'Task',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'Task',
            timestamps: true
        }
    );
    return Task;
};

module.exports = createTask;
