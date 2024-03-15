import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class homeStayEntity extends DefaultEntity {
  /**
   * @description Tên của homestay.
   */
  @IsNotEmpty()
  @Column()
  name: string; // Tên homestay

  /**
   * @description Địa chỉ cụ thể của homestay.
   */
  @IsNotEmpty()
  @Column()
  address: string; // Địa chỉ

  /**
   * @description Thông tin về địa điểm của homestay, giúp người dùng dễ dàng tìm kiếm và lọc kết quả.
   */
  @IsNotEmpty()
  @Column()
  city_district: string; // Thành phố/Quận/Huyện

  /**
   * @description Quốc gia nơi homestay được đặt.
   */
  @IsNotEmpty()
  @Column()
  country: string; // Quốc gia

  /**
   * @description Mô tả về homestay, bao gồm các tiện nghi, dịch vụ và thông tin khác.
   */
  @Column({ type: 'text' })
  description: string; // Mô tả

  /**
   * @description Giá thuê hoặc giá cho mỗi đêm ở homestay.
   */
  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number; // Giá

  /**
   * @description Số lượng phòng ngủ có sẵn trong homestay.
   */
  @IsNotEmpty()
  @Column()
  bedrooms: number; // Số lượng phòng ngủ

  /**
   * @description Số lượng phòng tắm có sẵn trong homestay.
   */
  @IsNotEmpty()
  @Column()
  bathrooms: number; // Số lượng phòng tắm

  /**
   * @description Danh sách các tiện ích có sẵn tại homestay như wifi, bếp, máy lạnh, máy sưởi, v.v.
   */
  @Column({ type: 'simple-array' })
  amenities: string[]; // Tiện ích

  /**
   * @description Hình ảnh của homestay để hiển thị trên trang web hoặc ứng dụng.
   */
  @IsNotEmpty()
  @Column({ type: 'simple-array' })
  images: string[]; // Hình ảnh

  /**
   * @description Trạng thái hoạt động của homestay, có thể là "hoạt động", "đã đóng cửa", "đang bảo trì", v.v.
   */
  @IsNotEmpty()
  @Column()
  status: string; // Trạng thái

  /**
   * @description Thông tin về chủ sở hữu của homestay, bao gồm tên, địa chỉ email, số điện thoại, v.v.
//    */
  //   @Column({ type: 'jsonb', nullable: true })
  //   owner: { name: string; email: string; phone: string }; // Chủ sở hữu

  /**
   * @description Dữ liệu địa lý như tọa độ địa lý (latitude và longitude) có thể giúp trong việc tìm kiếm homestay dựa trên vị trí.
//    */
  //   @Column({ type: 'geography', nullable: true })
  //   location: { type: string; coordinates: number[] }; // Vị trí địa lý
}
