const Sequelize = require('sequelize');

const {
  Card,
  CardSet,
  CollectionEntry,
  Message,
  User
} = require('../../models');

const {
  find,
  insert
} = require('../../middleware');

const getMessages = find({
  model: Message,
  method: 'findAndCountAll',
  where: (req) => (
    Sequelize.and(
      { message_id: null },
      Sequelize.or(
        { sender_id: req.user.id },
        { receiver_id: req.user.id }
      )
    )
  ),
  attributes: [
    'id',
    'message',
    'createdAt',
    'collection_entry_id',
    'sender_id',
    'receiver_id'
  ],
  include: [
    {
      model: User,
      as: 'sender',
      attributes: ['username']
    },
    {
      model: User,
      as: 'receiver',
      attributes: ['username']
    },
    {
      model: Message,
      as: 'replies',
      attributes: [
        'id',
        'message',
        'createdAt'
      ]
    },
    {
      model: CollectionEntry,
      as: 'collectionEntry',
      attributes: ['id'],
      include: [
        {
          model: Card,
          as: 'card',
          attributes: [
            'name',
            'image'
          ],
          include: {
            model: CardSet,
            as: 'series',
            attributes: ['name']
          }
        },
        {
          model: User,
          as: 'user',
          attributes: ['username']
        }
      ]
    }
  ],
  serialize: (data, { total, pages }) => ({
    items: data.map((item) => ({
      id: item.id,
      message: item.message,
      createdAt: item.createdAt,
      sender: item.sender,
      receiver: item.receiver,
      replies: item.replies,
      collectionEntry: item.collectionEntry
    })),
    total,
    pages
  })
});

const sendMessage = [
  find({
    model: User,
    method: 'findOne',
    where: (req) => ({
      id: req.body.receiverId
    }),
    updateRequest: (req, data) => {
      req.receiver_id = data.id;
    },
    end: false
  }),
  insert({
    model: Message,
    data: (req) => ({
      message: req.body.message,
      collection_entry_id: req.body.collectionEntryId,
      sender_id: req.user.id,
      receiver_id: req.receiver_id
    })
  })
];

module.exports = {
  getMessages,
  sendMessage
};
