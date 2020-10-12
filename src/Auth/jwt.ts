// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { get } from 'lodash';

// const Jwt = {
//   init(passport: any, serviceRegistry: ServiceRegistry) {
//     passport.use(
//       'jwt',
//       new JwtStrategy(
//         {
//           secretOrKey: jwtConfig.accessTokenSecret,
//           issuer: jwtConfig.issuer,
//           audience: jwtConfig.audience,
//           jwtFromRequest: ExtractJwt.fromExtractors([
//             (req) => get(req, 'headers.authorization'),
//           ]),
//         },
//         async (token, done) => {
//           const {
//             userService,
//           }: { userService: UserHandler } = serviceRegistry.services;
//           const userId = get(token, 'sub');
//           if (userId) {
//             try {
//               const info = new FindUsers();
//               info.setId(userId);
//               const user = await userService.detailUser(info);
//               done(null, user);
//             } catch (err) {
//               done(err);
//             }
//           } else {
//             done(null);
//           }
//         }
//       )
//     );
//     passport.use(
//       'jwt-customer',
//       new JwtStrategy(
//         {
//           secretOrKey: jwtCustomer.accessTokenSecret,
//           issuer: jwtCustomer.iscustomer,
//           audience: jwtCustomer.audience,
//           jwtFromRequest: ExtractJwt.fromExtractors([
//             (req) => get(req, 'headers.authorization'),
//           ]),
//         },
//         async (token, done) => {
//           const {
//             customerService,
//           }: { customerService: CustomerHandler } = serviceRegistry.services;
//           const customerId = get(token, 'sub');
//           if (customerId) {
//             try {
//               const infor = new CustomerId();
//               infor.setId(customerId);
//               const customer = await customerService.detailCustomer(infor);
//               done(null, customer);
//             } catch (error) {
//               done(error);
//             }
//           } else {
//             done(null);
//           }
//         }
//       )
//     );
//   },
// };

// export default Jwt;
