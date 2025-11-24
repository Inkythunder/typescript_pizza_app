import {useNavigate} from 'react-router-dom';

interface AddToCartButtonProps {
  onClick: () => void;
  redirectTo?: string;
}

function AddToCartButton({onClick, redirectTo}: AddToCartButtonProps) {

  const navigate = useNavigate();
  const handleClick = (): void => {
    onClick();
    if (redirectTo) {
      navigate(redirectTo);
    }
  }

  return(
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      onClick={handleClick}
    >
      Add to cart
    </button>)
}

export default AddToCartButton;