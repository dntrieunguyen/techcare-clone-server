const ROLE = {
   ADMIN: 'admin',
   SUPPORTER: 'supporter',
   CUSTOMER: 'agent',
};

const STATUS_CODE = {
   OK: 200,
   CREATED: 201,
   BAD_REQUEST: 400,
   UNAUTHORIZED: 401,
   FORBIDDEN: 403,
   NOT_FOUND: 404,
   CONFLICT: 409,
   INTERFACE_SERVER_ERROR: 500,
};

module.exports = { ROLE, STATUS_CODE };
