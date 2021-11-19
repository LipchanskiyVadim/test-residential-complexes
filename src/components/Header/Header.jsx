import s from './Header.module.css';
import img from '../../assets/img/fragment.svg'

const Header = () => {
	return (
		<header className={s.header}>
			<div className={s.wrapper_left}>
				<div className={s.title}>
					Галерея проектов
				</div>
				<div className={s.subtitle}>
					Сумма экономии рассчитана в сравнении 
					с суммой цен этого же перечня
					товаров по отдельности
				</div>
				<div className={s.button}>
					ВЫБРАТЬ ДИЗАЙН
				</div>
			</div>
			<div className={s.text_fragment}>
				<img src={img} className={s.img_fragment} alt='' />
				Мы успешно завершили
				 уже <span className={s.text_fragment_red}>
					более 450
				</span> ремонтов
			</div>
		</header>
	)
}

export default Header;