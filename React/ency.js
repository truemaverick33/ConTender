function Encryptor(str)
{
var enc = ""
   for(let i=0;i<str.length;i++)
   {
      enc += String.fromCharCode((str[i].charCodeAt(0)+56)) + String.fromCharCode(str[i].charCodeAt(0)+8); 
   }
  return enc;
}
function Decryptor(str)
{
var dec = ""
   for(let i=0;i<str.length;i++)
   {
	  if(i%2!==0)
		  continue;
      dec += String.fromCharCode((str[i].charCodeAt(0)-56)); 
   }
  return dec;
}
export {Encryptor,Decryptor};